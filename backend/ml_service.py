import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

MODEL_PATH = "health_coach_model.pkl"

def train_dummy_model():
    """
    Trains a simple dummy model for demonstration purposes.
    Features: [sleep_hours, hrv, intensity_encoded]
    Target: 0 (Rest), 1 (Light Training), 2 (Heavy Training)
    """
    print("Training a dummy RandomForest model...")
    # Dummy data
    X = np.array([
        [8.0, 75, 1], # Good sleep, good HRV, light day -> Heavy Training
        [5.0, 45, 2], # Poor sleep, low HRV, heavy day -> Rest
        [7.5, 60, 0], # Ok sleep, ok HRV, rest day -> Light Training
        [4.0, 40, 2], # Bad sleep, bad HRV, heavy day -> Rest
        [9.0, 80, 0], # Great sleep, high HRV, rest day -> Heavy Training
    ])
    y = np.array([2, 0, 1, 0, 2])
    
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    model.fit(X, y)
    
    # Save the model
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

def load_model():
    """
    Loads the trained model from disk. If not found, trains a new one.
    """
    if not os.path.exists(MODEL_PATH):
        print("Model not found.")
        train_dummy_model()
    return joblib.load(MODEL_PATH)

def predict_action(model, sleep_hours: float, hrv: int, intensity_yesterday: str):
    """
    Predicts the recommended action for today based on inputs.
    """
    intensity_map = {"rest": 0, "light": 1, "heavy": 2}
    intensity_val = intensity_map.get(intensity_yesterday.lower(), 1)
    
    features = np.array([[sleep_hours, hrv, intensity_val]])
    prediction = model.predict(features)[0]
    
    if prediction == 0:
        return "Rest & Recovery", "Your metrics suggest your body needs time to repair. Focus on sleep and hydration."
    elif prediction == 1:
        return "Light Training", "Your body is moderately recovered. A light or active recovery session is recommended."
    else:
        return "Heavy Training", "You are fully recovered! Great day to push your limits."
