import { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map.js';
import Events from './components/Events.js';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(1917);
  const significantYears = [1917, 1918, 1919, 1920, 1921];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events?year=${selectedYear}`)
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, [selectedYear]);

  const handleNextYear = () => {
    const currentIndex = significantYears.indexOf(selectedYear);
    if (currentIndex < significantYears.length - 1) {
      setSelectedYear(significantYears[currentIndex + 1]);
    }
  };

  const handlePreviousYear = () => {
    const currentIndex = significantYears.indexOf(selectedYear);
    if (currentIndex > 0) {
      setSelectedYear(significantYears[currentIndex - 1]);
    }
  }

  return (
    <>
      <div>
        <button onClick={handlePreviousYear} disabled={selectedYear === significantYears[0]}>Previous Year</button>
        <span>{selectedYear}</span>
        <button onClick={handleNextYear} disabled={selectedYear === significantYears.length - 1}>Next Year</button>
      </div>
      <Map events={events}/>
      {/* <Events events={events} /> */}
    </>
  );
}

export default App;
