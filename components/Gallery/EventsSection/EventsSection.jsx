'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventCard from '@/components/Reusable/EventCard/EventCard';
import styles from './EventsSection.module.css';
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
      title: "Nursing 2022",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2021",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2020",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2022",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2021",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
    {
      title: "Nursing 2020",
      date: "March 10/11/2025",
      location: "Dubai, UAE",
      image: '/images/conferences/image.png',
    },
  ];

  const [showGallery, setShowGallery] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // New toggle logic
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = (event) => {
    setShowGallery(true);
    setActiveEvent(event);
    setActiveEventIndex(events.indexOf(event));
  };

  const handleBackButtonClick = () => {
    setShowGallery(false);
    setActiveEvent(null);
  };

  const handleNextButtonClick = () => {
    let nextIndex = activeEventIndex + 1;
    if (nextIndex >= events.length) {
      nextIndex = 0;
    }
    setActiveEvent(events[nextIndex]);
    setActiveEventIndex(nextIndex);
  };

  const toggleVisibility = () => {
    if (isExpanded) {
      setVisibleCount(6);
    } else {
      setVisibleCount(events.length);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`container mt-5 p-3 ${styles.wrapper} text-center`}>
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
          <div className={`mt-4 mb-5 ${styles.buttons}`}>
            <button onClick={handleBackButtonClick} className={styles.backbutton}>
              ← Back
            </button>
            <button onClick={handleNextButtonClick} className={styles.nextbutton}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="row">
          <h3 className="text-black text-center fw-semibold">
            Past Conference Programs
          </h3>
          {events.slice(0, visibleCount).map((e, index) => (
            <div key={index} className="col-md-4 mb-4">
              <EventCard event={e} onClick={() => handleCardClick(e)} />
            </div>
          ))}
          <div className="text-center mt-3">
            <button className="brand-btn" onClick={toggleVisibility}>
              {isExpanded ? 'Show Less' : 'Load More'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsSection;
