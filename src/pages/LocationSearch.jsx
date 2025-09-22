import React, { useState, useRef, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const LocationSearch = ({ isAuthenticated, setRedirectTo }) => {

    console.log('GOOGLE_MAPS_API_KEY =========== ', GOOGLE_MAPS_API_KEY);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const autocompleteRef = useRef(null);


  const locations = useLocation();
  useEffect(()=>{
        if (!isAuthenticated) {
        setRedirectTo(locations.pathname);
        }
  },[isAuthenticated, locations, setRedirectTo])


  const handlePlaceChanged = () => {
    try {
      const place = autocompleteRef.current.getPlace();

      if (!place.geometry) {
        alert("No details available for input.");
        return;
      }

      const { lat, lng } = place.geometry.location;

      const latitude = lat();
      const longitude = lng();

      setCoords({ lat: latitude, lng: longitude });
      setLocation(place.formatted_address);
      localStorage.setItem("user_lat", latitude);
      localStorage.setItem("user_lng", longitude);
      localStorage.setItem("user_address", place.formatted_address);
    } catch (error) {
      console.error("Error parsing place:", error);
      alert("Failed to get location.");
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div>
        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter location"
            className="p-2 w-full border border-gray-300 rounded"
          />
        </Autocomplete>
        {coords.lat && (
          <div className="mt-2 text-sm text-gray-600">
            <strong>Lat:</strong> {coords.lat} | <strong>Lng:</strong> {coords.lng}
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default LocationSearch;
