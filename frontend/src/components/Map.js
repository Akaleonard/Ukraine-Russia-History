import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

function Map({ events }) {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })

  const MIN_TOP_POSITION = 350;

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
    if (!mapboxToken || !events) return;

    mapboxgl.accessToken = mapboxToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [30.5, 50.5], // Longitude, latitude
      zoom: 11, // Zoom level
    });

    events.forEach(event => {
        if (event.location && event.location.coordinates) {
            const marker = new mapboxgl.Marker().setLngLat(event.location.coordinates).addTo(mapRef.current);

            marker.getElement().addEventListener('click', (e) => {
                const markerBounds = e.target.getBoundingClientRect(); // Get marker's position
                let topPosition = markerBounds.top + window.scrollY - 40;
                const leftPosition = markerBounds.left + window.scrollX;


                if (topPosition < MIN_TOP_POSITION) {
                    topPosition = MIN_TOP_POSITION;
                }


                setSelectedEvent(event);
                setCardPosition({
                    top: topPosition, // Adjust to be above the marker
                    left: leftPosition
                });
            });
        }
    })

    return () => {
      mapRef.current.remove();
    };
  }, [mapboxToken, events]);

  return (
    <div style={{ position: 'relative' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />

        {selectedEvent && (
            <div className="event-card-overlay" style={{ top: cardPosition.top, left: cardPosition.left }}>
                <div className="event-card-content">
                    <h3>{selectedEvent.title}</h3>
                    <p>{selectedEvent.description}</p>
                    {selectedEvent.imageUrl && <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />}
                </div>
                <button onClick={() => setSelectedEvent(null)} className="close-btn">Close</button>
            </div>
        )}
    </div>
    
  );
}

export default Map;
