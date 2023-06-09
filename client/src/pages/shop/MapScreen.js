import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  MarkerF,
} from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { Store } from './Store';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const defaultLocation = { lat: 45.516, lng: -73.56 };
const libs = ['places'];

export default function MapScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [googleApiKey, setGoogleApiKey] = useState('AIzaSyBRXYOIaJcWfBMvghlARG7C4pW4dvVqiKo');
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation os not supported by this browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios('http://localhost:8800/api/keys/google', {
        withCredentials: true,
      });
      setGoogleApiKey(data.key);
      getUserCurrentLocation();
    };

    fetch();
    ctxDispatch({
      type: 'SET_FULLBOX_ON',
    });
  }, [ctxDispatch]);

  const onLoad = (map) => {
    mapRef.current = map;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onDragEnd = () => {
    setLocation({
      lat: markerRef.current.getPosition().lat(),
      lng: markerRef.current.getPosition().lng(),
    });
  };

  const onConfirm = () => {
    const places = placeRef.current.getPlaces() || [{}];
    const updatedLocation = {
      lat: markerRef.current.getPosition().lat(),
      lng: markerRef.current.getPosition().lng(),
    };
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION',
      payload: {
        lat: location.lat,
        lng: location.lng,
        address: places[0].formatted_address,
        name: places[0].name,
        vicinity: places[0].vicinity,
        googleAddressId: places[0].id,
      },
    });
    toast.success('location selected successfully.');
    navigate('/shipping');
  };
  return (
    <div className="full-box">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="smaple-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Enter your address"></input>
              <Button type="button" onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </StandaloneSearchBox>
          {location.lat !== 0 && location.lng !== 0 && (
            <MarkerF position={location} onLoad={onMarkerLoad} draggable={true} onDragEnd={onDragEnd}/>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}