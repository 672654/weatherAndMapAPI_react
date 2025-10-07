const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

export const getWeatherData = async (lat, lon) => {
  const response = await fetch(`${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  const data = await response.json();
  return data;
}