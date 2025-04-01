
'use client';
import React, { useRef, useEffect } from 'react';
import './PerspectiveScroll.css'; // Create a CSS file for styling

const PerspectiveScroll = () => {
  const images = [
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',
    '/images/conferences/image.png',



  ];
  return (
    <div className="banner">
      <div className="slider" style={{ '--quantity': images.length }}>
        {images.map((image, index) => (
          <div className="item" key={index} style={{ '--position': index + 1 }}>
            <img src={image} alt={`dragon_${index + 1}`} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default PerspectiveScroll;