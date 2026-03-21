import os
from fastapi import FastAPI, HTTPException, Body, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from contextlib import asynccontextmanager
from typing import List, Optional
from pydantic import BaseModel, Field
import database
import auth
from ml_model import ai_coach_model

# Pydantic Models for Data Validation
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    avatar: Optional[str] = None
    sport: Optional[str] = None
    dob: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    bio: Optional[str] = None
    goals: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

class WorkoutCreate(BaseModel):
    title: str
    duration: str
    intensity: str
    muscleGroup: str
    description: Optional[str] = None

class AICoachContext(BaseModel):
    recent_sleep_hours: float
    recent_hrv: int
    workout_intensity_yesterday: str

# Lifespan context manager for connection setup/teardown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await database.connect_to_mongo()
    
    yield
    # Shutdown
    await database.close_mongo_connection()

app = FastAPI(
    title="Athulation API",
    description="Backend API powering the Next-Gen Athlete OS",
    lifespan=lifespan
)

# Allow frontend to connect
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://athulate.vercel.app")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL, 
        "https://athulate.vercel.app", 
        "http://localhost:3000"
    ],  # Allows live Vercel and local Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Athulation API is running"}

# --- Workouts CRUD ---

@app.post("/api/workouts")
async def create_workout(workout: WorkoutCreate):
    # Standard MongoDB dict conversion
    workout_dict = workout.model_dump()
    result = await database.db["workouts"].insert_one(workout_dict)
    
    # Return the newly created document's ID
    return {"message": "Workout created successfully", "id": str(result.inserted_id)}

@app.get("/api/workouts")
async def get_workouts():
    workouts = []
    # Find all workouts, limiting to 50 for safety
    cursor = database.db["workouts"].find({}).limit(50)
    async for doc in cursor:
        doc["_id"] = str(doc["_id"]) # convert ObjectId to string for JSON serialization
        workouts.append(doc)
    return {"data": workouts}

# --- Authentication ---

@app.post("/api/users/signup", response_model=Token)
async def signup(user: UserCreate):
    # Check if user exists
    existing_user = await database.db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    # Hash password and save
    hashed_password = auth.get_password_hash(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password
    }
    result = await database.db["users"].insert_one(new_user)
    
    # Generate token
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/users/login", response_model=Token)
async def login(user: UserLogin):
    db_user = await database.db["users"].find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    if not auth.verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# --- Protected User Routes ---

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = auth.decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid session")
    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token payload")
        
    user = await database.db["users"].find_one({"email": email}, {"_id": 0, "hashed_password": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    return user

@app.get("/api/users/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

@app.put("/api/users/me")
async def update_me(user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
    update_data = {k: v for k, v in user_update.model_dump().items() if v is not None}
    if not update_data:
        return current_user
        
    await database.db["users"].update_one(
        {"email": current_user["email"]},
        {"$set": update_data}
    )
    
    updated_user = await database.db["users"].find_one({"email": update_data.get("email", current_user["email"])}, {"_id": 0, "hashed_password": 0})
    return updated_user

# --- AI Integration Placeholder ---

@app.post("/api/ai/suggestions")
async def generate_ai_suggestion(context: AICoachContext = Body(...)):
    """
    Endpoint that processes athlete context through our Machine Learning model.
    """
    # 1. Feed the frontend's request data into the ML Model
    prediction_result = ai_coach_model.predict_readiness(
        sleep_hours=context.recent_sleep_hours,
        hrv=context.recent_hrv,
        yesterday_intensity=context.workout_intensity_yesterday
    )
    
    # 2. Return the model's prediction securely back to the frontend JSON
    return {
        "readiness_score": prediction_result["readiness_score"],
        "suggestion": prediction_result["suggestion"],
        "impact": prediction_result["impact"],
        "model_used": prediction_result["model_version"]
    }
