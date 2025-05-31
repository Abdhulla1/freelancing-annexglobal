import React, { useState,useRef,useEffect } from 'react';
import Image from 'next/image';
import { saveSpeakerBG } from '@/service/speakerService';
import { Toast } from 'primereact/toast';
import { getBgImage } from '@/service/speakerService';
export default function SpeakerBackgroundSelector() {
  const toast = useRef(null);

  const [selectedImageNumber, setSelectedImageNumber] = useState(1);

  const images = [
    '/images/speaker-bg/image1.webp',
    '/images/speaker-bg/image2.webp',
    '/images/speaker-bg/image3.webp',
    '/images/speaker-bg/image4.webp',
    '/images/speaker-bg/image5.webp',
  ];
  useEffect(() => {
    const fetchBG = async () => {
      try {
        const response = await getBgImage();
        setSelectedImageNumber(response.data?.detail?.speakers || 1)
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "failed fetch BG",
          detail:
            error.message ||
            "Failed to fetch BG",
          life: 3000,
        });
      }
    };
    fetchBG();
  }, []);
  const handleSelect = async(imageNumber) => {
    const payLoad = {
      speakers:imageNumber
    }
     try {
          const response = await saveSpeakerBG(payLoad);
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
