import { useState } from "react";
import { getGeoLocation } from "../api/Geocode";
import { getWeatherData } from "../api/WeatherApi";
import WeatherCard from "../components/WeatherCard";
import "../css/Weather.css";

function Weather() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      setWeatherData(null);

      const { lat, lon } = await getGeoLocation(city);
      console.log(lat, lon);

      const locationData = await getWeatherData(lat, lon);
      console.log(locationData);

      setWeatherData(locationData);
    } catch (error) {
      console.log(error);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
    setCity("");
  };

  return (
    <>
      <form className="form-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {loading && <p className="loading">Loading...</p>}
        {!loading && weatherData && (
          <WeatherCard location={weatherData.name || city} data={weatherData} />
        )}
      </div>
    </>
  );
}

export default Weather;
