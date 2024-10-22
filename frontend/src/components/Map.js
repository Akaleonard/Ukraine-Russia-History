import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
        try {
            const response = await axios.get('/api/map-token');
            setMapboxToken(response.data.token);
        } catch (error) {
            console.error('Error fetching Mapbox token:', error);
        }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    if (!mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [30.5, 50.5], // Longitude, latitude
      zoom: 9, // Zoom level
    });

    return () => {
      mapRef.current.remove();
    };
  }, [mapboxToken]);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '350px' }} />
  );
}

export default Map;
