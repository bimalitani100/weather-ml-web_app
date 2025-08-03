async function getWeather() {
    const city = document.getElementById("cityInput").value;
  
    if (!city) {
      alert("Please enter a city!");
      return;
    }
  
    // Show loading message
    document.getElementById("weatherResult").innerHTML = `
      <p>Fetching weather for <strong>${city}</strong>...</p>
    `;
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_weather?city=${city}`);
      const data = await response.json();
  
      if (data.error) {
        document.getElementById("weatherResult").innerHTML = `<p>${data.error}</p>`;
      } else {
        document.getElementById("weatherResult").innerHTML = `
          <h2>${data.city}</h2>
          <p>Temperature: ${data.temperature} °C</p>
          <p>Condition: ${data.description}</p>
        `;
      }
    } catch (error) {
      document.getElementById("weatherResult").innerHTML = `<p>Something went wrong. Please try again.</p>`;
      console.error(error);
    }
  }
  
  