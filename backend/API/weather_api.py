# backend/api/weather_api.py
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Loads .env from the root directory


def get_weather_data(city):
    API_KEY = os.getenv("OPENWEATHER_API_KEY")
    if not API_KEY:
        return {"error": "API key not found"}
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    
    if response.status_code == 200:
        json_data = response.json()
        return {
            "city": city,
            "temperature": json_data["main"]["temp"],
            "description": json_data["weather"][0]["description"]
        }
    else:
        return {"error": "City not found"}
