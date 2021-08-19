const fetch = require('node-fetch');

async function fetchWeather(lat, lon) {
  const apiResp = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lat=${lat}&lon=${lon}`
  );
  const apiData = await apiResp.json();
  const data = apiData.data.map((obj) => {
    return {
      'forecast': obj.weather.description,
      'time': new Date(obj.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  });
  return data;
}

module.exports = {
  fetchWeather,
};