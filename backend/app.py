from flask import Flask, request, jsonify
from API.weather_api import get_weather_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_weather')
def get_weather():
    city = request.args.get('city')
    data = get_weather_data(city)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

