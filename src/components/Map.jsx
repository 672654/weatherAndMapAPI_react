import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "../css/Map.css";

function MapComponent({ lat, lon }) {
  const mapViews = {
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    satelite: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  };

  const [view, setView] = useState("dark");

  return (
    <>
      <div className="select-menu">
        <label>Map Style:</label>
        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="satelite">Satellite</option>
        </select>
      </div>
      <MapContainer className="map-container" center={[lat, lon]} zoom={10}>
        <TileLayer url={mapViews[view]} />
        <Marker position={[lat, lon]}></Marker>
      </MapContainer>
    </>
  );
}

export default MapComponent;
