import { useEffect, useState } from "react";
import "../css/WeatherCard.css";
import MapComponent from "./Map";

function WeatherCard({ location, data }) {
  if (!data) {
    return <></>;
  }

  const [weather, setWeather] = useState("");
  const mainWeather = data.weather[0].main;

  useEffect(() => {
    setWeather(mainWeather);
  }, [mainWeather]);

  const tempCelsius = Math.round(data.main.temp - 273.15);

  const lat = data.coord.lat;
  const lon = data.coord.lon;

  const degree = data.wind.deg;

  const getWindDirection = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) return "North";
    if (degrees >= 22.5 && degrees < 67.5) return "Northeast";
    if (degrees >= 67.5 && degrees < 112.5) return "East";
    if (degrees >= 112.5 && degrees < 157.5) return "Southeast";
    if (degrees >= 157.5 && degrees < 202.5) return "South";
    if (degrees >= 202.5 && degrees < 247.5) return "Southwest";
    if (degrees >= 247.5 && degrees < 292.5) return "West";
    if (degrees >= 292.5 && degrees < 337.5) return "Northwest";
    return "Unknown";
  };

  const windDirection = getWindDirection(degree);

  return (
    <>
      <div className="card">
        <h2>{location}</h2>
        <div className="flex">
          <div className={weather}>
            <h3>Weather</h3>
            <p>
              Description: {data.weather[0].main}, {data.weather[0].description}
            </p>
            <p>Temp: {tempCelsius}C</p>
          </div>
          <div>
            <h3>Wind</h3>
            <p>Speed: {data.wind.speed} m/s</p>
            <p>
              Direction: {windDirection} ({degree}°)
            </p>
          </div>
          <div>
            <h3>Data</h3>
            <p>Data</p>
            <p>Data</p>
          </div>
        </div>
      </div>
      <div className="map-container">
        <MapComponent lat={lat} lon={lon} />
      </div>
    </>
  );
}

export default WeatherCard;
