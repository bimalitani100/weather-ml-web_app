let currentTempCelsius = null;
let currentCity = "";
let currentDescription = "";
let isCelsius = true;

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultBox = document.getElementById("weatherResult");
  const toggleBtn = document.getElementById("toggleUnitBtn");

  resultBox.innerHTML = "Loading...";
  toggleBtn.style.display = "none";

  try {
    const response = await fetch(`http://127.0.0.1:5000/get_weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      resultBox.innerHTML = `<span style="color: red;">${data.error}</span>`;
    } else {
      currentCity = data.city;
      currentTempCelsius = data.temperature;
      currentDescription = data.description;
      isCelsius = true;

      updateDisplay();
      toggleBtn.style.display = "inline-block";
      toggleBtn.textContent = "Switch to °F";
    }
  } catch (error) {
    resultBox.innerHTML = `<span style="color: red;">Something went wrong</span>`;
  }
}

function updateDisplay() {
  const resultBox = document.getElementById("weatherResult");
  const temp = isCelsius
    ? `${currentTempCelsius.toFixed(1)} °C`
    : `${(currentTempCelsius * 9/5 + 32).toFixed(1)} °F`;

  resultBox.innerHTML = `
    <p><strong>City:</strong> ${currentCity}</p>
    <p><strong>Temperature:</strong> ${temp}</p>
    <p><strong>Description:</strong> ${currentDescription}</p>
  `;
}

function toggleUnit() {
  isCelsius = !isCelsius;
  const toggleBtn = document.getElementById("toggleUnitBtn");
  toggleBtn.textContent = isCelsius ? "Switch to °F" : "Switch to °C";
  updateDisplay();
}
