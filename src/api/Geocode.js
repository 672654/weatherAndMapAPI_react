const API_KEY = "835595b88007ab4d934866f290e428e1";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/"


export const getGeoLocation = async (location) => {
  const response = await fetch(`${BASE_URL}direct?q=${location}&appid=${API_KEY}`)
  const data = await response.json();

  const lat = parseFloat(data[0].lat.toFixed(2));
  const lon = parseFloat(data[0].lon.toFixed(2));
  return { lat, lon };
}