# backend/api/weather_api.py
import requests

def get_weather_data(city):
    API_KEY = "552e50b20bb3ff3ca213cf539c040224"
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
