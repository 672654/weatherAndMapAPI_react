import { useEffect, useMemo, useState } from "react";
import "../css/WeatherCard.css";
import MapComponent from "./Map";

function WeatherCard({ location, data }) {
  if (!data) {
    return <></>;
  }

  const [weather, setWeather] = useState("");
  const [windStyle, setWindStyle] = useState("wind-low");

  const mainWeather = data.weather[0].main;
  const windSpeed = data.wind.speed;

  // Beregn sunrise og sunset tider - useMemo for å unngå unødvendige beregninger
  const { sunriseTime, sunsetTime, localTimeData } = useMemo(() => {
    // Konverter sunrise og sunset til lokal tid
    const sunriseLocalStamp = data.sys.sunrise + data.timezone;
    const sunsetLocalStamp = data.sys.sunset + data.timezone;

    const sunriseDate = new Date(sunriseLocalStamp * 1000);
    const sunsetDate = new Date(sunsetLocalStamp * 1000);

    const sunrise = `${sunriseDate
      .getUTCHours()
      .toString()
      .padStart(2, "0")}:${sunriseDate
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;

    const sunset = `${sunsetDate
      .getUTCHours()
      .toString()
      .padStart(2, "0")}:${sunsetDate
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Beregn lokal tid
    const localTimeStamp = data.dt + data.timezone;
    const localDate = new Date(localTimeStamp * 1000);

    const hours = localDate.getUTCHours().toString().padStart(2, "0");
    const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
    const day = localDate.getUTCDate().toString().padStart(2, "0");
    const month = (localDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = localDate.getUTCFullYear();

    const localTime = `${hours}:${minutes} ${day}.${month}.${year}`;

    return {
      sunriseTime: sunrise,
      sunsetTime: sunset,
      localTimeData: localTime,
    };
  }, [data.sys.sunrise, data.sys.sunset, data.timezone, data.dt]);

  useEffect(() => {
    setWeather(mainWeather);
    setWindStyle(windSpeed > 6 ? "wind-high" : "wind-low");
  }, [mainWeather, windSpeed]);

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
          <div className={windStyle}>
            <h3>Wind</h3>
            <p>Speed: {data.wind.speed} m/s</p>
            <p>
              Direction: {windDirection} ({degree}°)
            </p>
          </div>
          <div className="sunset">
            <h3>Time</h3>
            <p>Local Time: {localTimeData}</p>
            <p>Sunrise: {sunriseTime}</p>
            <p>Sunset: {sunsetTime}</p>
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
