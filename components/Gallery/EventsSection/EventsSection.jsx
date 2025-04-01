'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventCard from '@/components/Reusable/EventCard/EventCard';
import styles from './EventsSection.module.css'
import ImageGalleryComponent from '../ImageGallery/ImageGalleryComponent';

function EventsSection() {
  const events = [
    {
      title: "Nursing 2024",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2025",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2023",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2024",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2024",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2024",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
  ];

  const [showGallery, setShowGallery] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null); // Changed to null initially
  const [activeEventIndex, setActiveEventIndex] = useState(0); // Add index state
  const handleCardClick = (event) => {
    setShowGallery(true);
    setActiveEvent(event); // Store the entire event object
    setActiveEventIndex(events.indexOf(event)); // Set initial index
  };

  const handleBackButtonClick = () => {
    setShowGallery(false);
    setActiveEvent(null); // Reset active event when going back
  };
  const handleNextButtonClick = () => {
    if (events && events.length > 0) {
      let nextIndex = activeEventIndex + 1;
      if (nextIndex >= events.length) {
        nextIndex = 0; // Loop back to the first event
      }
      setActiveEvent(events[nextIndex]);
      setActiveEventIndex(nextIndex);
    }
  };

  return (
    <div className={`container mt-5 ${styles.wrapper} text-center`}>
      {showGallery ? (
        <div className='container'>
          <div className='mb-4'>
            <h3 className="text-capitalize text-black text-center fw-semibold">
             {activeEvent.title}
            </h3>
            {activeEvent && (
              <p className="text-center text-black">
                {activeEvent.date} | {activeEvent.location}
              </p>
            )}
          </div>
          <ImageGalleryComponent />
          <div className={styles.buttons}>
            <button onClick={handleBackButtonClick} className={styles.backbutton}>
              ← Back
            </button>
            <button onClick={handleNextButtonClick} className={styles.nextbutton}>Next</button>
          </div>
        </div>
      ) : (
        <div className="row">
          <h3 className="text-black text-center fw-semibold">
            Past Conference Programs
          </h3>
          {events.map((e, index) => (
            <div key={index} className="col-md-4 mb-4">
              <EventCard event={e} onClick={() => handleCardClick(e)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsSection;