const API_KEY = "835595b88007ab4d934866f290e428e1";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

export const getWeatherData = async (lat, lon) => {
  const response = await fetch(`${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  const data = await response.json();
  return data;
}