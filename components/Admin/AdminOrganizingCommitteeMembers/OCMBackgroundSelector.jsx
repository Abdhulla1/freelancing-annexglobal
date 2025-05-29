import React, { useState,useRef } from 'react';
import Image from 'next/image';
import { saveOCMBG } from '@/service/ocmService';
import { Toast } from 'primereact/toast';

export default function OCMBackgroundSelector() {
  const toast = useRef(null);

  const [selectedImageNumber, setSelectedImageNumber] = useState(1);

  const images = [
    '/images/speaker-bg/image1.webp',
    '/images/speaker-bg/image2.webp',
    '/images/speaker-bg/image3.webp',
    '/images/speaker-bg/image4.webp',
    '/images/speaker-bg/image5.webp',
  ];

  const handleSelect = async(imageNumber) => {
    const payLoad = {
      ocm:imageNumber
    }
     try {
          const response = await saveOCMBG(payLoad);
          if (response.status === 200) {
              setSelectedImageNumber(imageNumber);
            toast.current?.show({
              severity: 'success',
              summary: 'Updated',
              detail: response.data.detail[0].msg || 'Status updated successfully',
            });
          }
        } catch (err) {
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update status',
          });
        }
  };

  return (
    <div className='col-12 d-flex flex-wrap justify-content-center gap-2'>
            <Toast ref={toast} />
      
      {images.map((src, index) => {
        const imageNumber = index + 1;
        return (
          <Image
            key={index}
            src={src}
            alt={`ImageBg ${imageNumber}`}
            onClick={() => handleSelect(imageNumber)}
            height={100}
            width={100}
            style={{
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              border: selectedImageNumber === imageNumber ? '3px solid yellow' : '2px solid transparent',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        );
      })}
    </div>
  );
}
