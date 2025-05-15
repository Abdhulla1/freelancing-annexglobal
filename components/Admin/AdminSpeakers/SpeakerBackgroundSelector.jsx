import React, { useState } from 'react';
import Image from 'next/image';

export default function SpeakerBackgroundSelector() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [
    '/images/speaker-bg/image1.webp',
    '/images/speaker-bg/image2.webp',
    '/images/speaker-bg/image3.webp',
    '/images/speaker-bg/image4.webp',
    '/images/speaker-bg/image5.webp',
  ];

  const handleSelect = (index) => {
    setSelectedIndex(index);
    console.log(`Selected image index: ${index + 1}`);
  };

  return (
    <div className='col-12 d-flex flex-wrap justify-content-center gap-2' >
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`ImageBg ${index + 1}`}
          onClick={() => handleSelect(index)}
          height={100}
          width={100}
          style={{
            width: '100px',
            height: '100px',
            cursor: 'pointer',
            border: selectedIndex === index ? '3px solid yellow' : '2px solid transparent',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
}
