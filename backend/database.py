import os
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "athulation")

client = None
db = None

async def connect_to_mongo():
    global client, db
    print("Connecting to MongoDB...")
    client = AsyncIOMotorClient(MONGODB_URI, tlsCAFile=certifi.where())
    db = client[DATABASE_NAME]
    
    # Ping to verify connection
    try:
        await client.admin.command('ping')
        print("Successfully connected to MongoDB Atlas!")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("MongoDB connection closed.")
