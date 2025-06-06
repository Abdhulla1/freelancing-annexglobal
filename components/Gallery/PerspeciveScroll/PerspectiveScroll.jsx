
'use client';
import React, { useRef, useEffect } from 'react';
import './PerspectiveScroll.css'; // Create a CSS file for styling
import { useGalleryImages } from '@/hooks/useWeather';
const PerspectiveScroll = () => {
  const { data: galleryImages } = useGalleryImages();

  console.log('Gallery Images:', galleryImages);
  
  const images = galleryImages?.detail?.imageUrls || [
    'images/gallery/dragon1.jpg',
    'images/gallery/dragon2.jpg',
    'images/gallery/dragon3.jpg',
    'images/gallery/dragon4.jpg',
    'images/gallery/dragon5.jpg',
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
