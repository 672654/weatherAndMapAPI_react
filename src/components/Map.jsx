import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

function MapComponent({ lat, lon }) {
  return (
    <>
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}></Marker>
      </MapContainer>
    </>
  );
}

export default MapComponent;
