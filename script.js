function getWeather() {
  const place = document.getElementById("placeInput").value.trim();
  const country = document.getElementById("countryInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!place || !country) {
    resultDiv.innerHTML = "⚠️ Please enter both city and country.";
    return;
  }

  const query = `${place},${country}`;
  const apiKey = "ec3e5b17856641db86d113551252405";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}&aqi=yes`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Weather not found.");
      return response.json();
    })
    .then((data) => {
      resultDiv.innerHTML = `
        <h2>🌍 ${data.location.name}, ${data.location.country}</h2>
        <p>🌡️ Temperature: ${data.current.temp_c}°C</p>
        <p>📊 Humidity: ${data.current.humidity}%</p>
        <p>🌤️ Condition: ${data.current.condition.text}</p>
      `;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      resultDiv.innerHTML = "⚠️ Unable to fetch weather data.";
    });
}
