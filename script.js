async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!location) {
    resultDiv.innerHTML = "❗ Please enter a location.";
    return;
  }

  const apiKey = "ec3e5b17856641db86d113551252405";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    resultDiv.innerHTML = "🔄 Fetching weather data...";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Location not found or API error.");
    }

    const data = await response.json();
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const feelsLike = data.current.feelslike_c;
    const humidity = data.current.humidity;

    resultDiv.innerHTML = `
      <h3>📍 Weather in ${data.location.name}, ${data.location.country}</h3>
      <p><strong>🌡️ Temperature:</strong> ${tempC} °C</p>
      <p><strong>🤔 Feels Like:</strong> ${feelsLike} °C</p>
      <p><strong>🌥️ Condition:</strong> ${condition}</p>
      <p><strong>💧 Humidity:</strong> ${humidity}%</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `❌ Error: ${error.message}`;
  }
}
