"use client";
import { ImageGallery } from "react-image-grid-gallery";
import Link from "next/link";

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

export default function Gallery({ conference }) {
  const imagesArray = conference?.pastConference?.pastGallery?.galleryImages || [];
  const finalImagesArray = imagesArray.map((image, index) => ({
    id: index + 1,
    src: image,
    thumbnail: image,
    caption: image.caption || "",
    alt: image.alt || "Gallery Image",
  }));

  const imageHeading = conference?.pastConference?.pastGallery?.title || "Past Gallery Photos";


  return (
    <div className="container p-5">
      <div className="mb-4">
        <h3 className="text-capitalize text-black text-center fw-semibold">
          Past Gallery Photos
        </h3>
        {true && (
          <p className="text-center text-black">
            {imageHeading}
          </p>
        )}
      </div>
      <ImageGallery
        imagesInfoArray={finalImagesArray}
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
