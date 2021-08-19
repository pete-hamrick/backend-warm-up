const fetch = require('node-fetch');

async function fetchLocation(search) {
  const apiResp = await fetch(
    `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODING_KEY}&q=${search}&format=json`
  );
  const apiData = await apiResp.json();
  const data = {
    'formatted_query': apiData[0].display_name,
    'latitude': apiData[0].lat,
    'longitude': apiData[0].lon
  };
  return data;
}

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

async function fetchReviews(lat, lon) {
  const apiResp = await fetch(
    `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`, 
    {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: { 
        'Authorization': 'Bearer ' + process.env.YELP_KEY,
        'Content-Type': 'application/json'
      }
    }
  );
  const apiData = await apiResp.json();
  const data = apiData.businesses.map(business => {
    return {
      'name': business.name,
      'image_url': business.image_url,
      'price': business.price,
      'rating': business.rating,
      'url': business.url
    };
  });
  return data;
}

module.exports = {
  fetchWeather, fetchReviews, fetchLocation
};