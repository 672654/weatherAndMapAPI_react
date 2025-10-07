import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "../css/Map.css";

function MapComponent({ lat, lon }) {
  const mapViews = {
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    humanitarian: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    voyager:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    natgeo:
      "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
    esriGray:
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  };

  const [view, setView] = useState("dark");

  return (
    <>
      <div className="select-menu">
        <label>Map Style:</label>
        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="satellite">Satellite</option>
          <option value="terrain">Terrain</option>
          <option value="osm">OpenStreetMap</option>
          <option value="humanitarian">Humanitarian</option>
          <option value="voyager">Voyager</option>
          <option value="natgeo">National Geographic</option>
          <option value="esriGray">ESRI Dark Gray</option>
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
