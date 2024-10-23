import { useState } from 'react';

const Events = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState()
    const years = [...new Set(events.map(event => new Date(event.date).getFullYear()))];

    const handleYearClick = (year) => {
        const filteredEvents = events.filter(event => new Date(event.date).getFullYear() === year);
        setSelectedEvent(filteredEvents[0]);
    }

    return (
        <div>
            <h2>Timeline</h2>
            <div>
                {years.map(year => (
                    <button key={year} onClick={() => handleYearClick(year)}>
                        {year}
                    </button>
                ))}
            </div>
            {selectedEvent && (
                <div>
                    <h3>{selectedEvent.title}</h3>
                    <p>{selectedEvent.description}</p>
                    <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
                </div>
            )}
        </div>
    )
}

export default Events;