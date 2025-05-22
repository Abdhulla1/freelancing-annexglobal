"use client";
import { ImageGallery } from "react-image-grid-gallery";
import Link from "next/link";
const imagesArray = [
  {
    id: "uniqueid14",
    alt: "Image14's alt text",
    caption: "Image14's description",
    src: "/images/conferences/EventImages/image-14.png",
  },
  {
    id: "uniqueid11",
    alt: "Image11's alt text",
    caption: "Image11's description",
    src: "/images/conferences/EventImages/image-11.png",
  },
  {
    id: "uniqueid16",
    alt: "Image16's alt text",
    caption: "Image16's description",
    src: "/images/conferences/EventImages/image-16.png",
  },
  {
    id: "uniqueid22",
    alt: "Image22's alt text",
    caption: "Image22's description",
    src: "/images/conferences/EventImages/image-22.png",
  },
  {
    id: "uniqueid20",
    alt: "Image20's alt text",
    caption: "Image20's description",
    src: "/images/conferences/EventImages/image-20.png",
  },

  {
    id: "uniqueid17",
    alt: "Image17's alt text",
    caption: "Image17's description",
    src: "/images/conferences/EventImages/image-17.png",
  },
  {
    id: "uniqueid19",
    alt: "Image19's alt text",
    caption: "Image19's description",
    src: "/images/conferences/EventImages/image-23.png",
  },
  {
    id: "uniqueid21",
    alt: "Image21's alt text",
    caption: "Image21's description",
    src: "/images/conferences/EventImages/image-21.png",
  },
  {
    id: "uniqueid13",
    alt: "Image13's alt text",
    caption: "Image13's description",
    src: "/images/conferences/EventImages/image-13.png",
  },
  {
    id: "uniqueid18",
    alt: "Image18's alt text",
    caption: "Image18's description",
    src: "/images/conferences/EventImages/image-18.png",
  },
  {
    id: "uniqueid12",
    alt: "Image12's alt text",
    caption: "Image12's description",
    src: "/images/conferences/EventImages/image-12.png",
  },
  {
    id: "uniqueid10",
    alt: "Image10's alt text",
    caption: "Image10's description",
    src: "/images/conferences/EventImages/image-10.png",
  },
  {
    id: "uniqueid15",
    alt: "Image15's alt text",
    caption: "Image15's description",
    src: "/images/conferences/EventImages/image-15.png",
  },
  {
    id: "uniqueid666",
    alt: "Image6's alt text",
    caption: "Image6's description",
    src: "/images/conferences/EventImages/image-6.png",
  },
  {
    id: "uniqueid777",
    alt: "Image7's alt text",
    caption: "Image7's description",
    src: "/images/conferences/EventImages/image-7.png",
  },
  {
    id: "uniqueid999",
    alt: "Image9's alt text",
    caption: "Image9's description",
    src: "/images/conferences/EventImages/image-9.png",
  },
  {
    id: "uniqueid555",
    alt: "Image5's alt text",
    caption: "Image5's description",
    src: "/images/conferences/EventImages/image-5.png",
  },
  {
    id: "uniqueid23",
    alt: "Image23's alt text",
    caption: "Image23's description",
    src: "/images/conferences/EventImages/image-19.png",
  },
  {
    id: "uniqueid222",
    alt: "Image2's alt text",
    caption: "Image2's description",
    src: "/images/conferences/EventImages/image-1.png",
  },
  {
    id: "uniqueid888",
    alt: "Image8's alt text",
    caption: "Image8's description",
    src: "/images/conferences/EventImages/image-8.png",
  },
  {
    id: "uniqueid444",
    alt: "Image4's alt text",
    caption: "Image4's description",
    src: "/images/conferences/EventImages/image-4.png",
  },
  {
    id: "uniqueid333",
    alt: "Image3's alt text",
    caption: "Image3's description",
    src: "/images/conferences/EventImages/image-2.png",
  },
  {
    id: "uniqueid111",
    alt: "Image1's alt text",
    caption: "Image1's description",
    src: "/images/conferences/EventImages/image.png",
  },
];
const customGalleryStyles = {
  modalSlideBtnStyle: {
    background: "linear-gradient(180deg, #121989 0%, #050623 100%)",
    borderRadius: "10px", // Rounded corners
    padding: "10px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
    color: "white", // White icon color
    fontSize: "20px",
    position: "absolute",
    margin: "0 20px", // 0 top/bottom, 10px left/right.
  },
};

export default function Gallery() {
  return (
    <div className="container p-5">
      <div className="mb-4">
        <h3 className="text-capitalize text-black text-center fw-semibold">
          Past Gallery Photos
        </h3>
        {true && (
          <p className="text-center text-black">
            May 2024
          </p>
        )}
      </div>
      <ImageGallery
        imagesInfoArray={imagesArray}
        customStyles={customGalleryStyles}
      />
      {/* <div className={`mt-4 mb-5 `}>
        <Link href={`/conference/${conference.id}/past-conferences/`} className={`brand-btn`}>
          ← Back
        </Link>
       
      </div> */}
    </div>
  );
}
