import React from "react";
import Prospectus from "../AboutConference/Prospectus/Prospectus";
import About from "../SponsorsExhibitors/About/About";
import VenueDetails from "./VenueDetails/VenueDetails";
import VenueLocation from "./VenueLocation/VenueLocation";
export default function Venue({ conference }) {
  return (
    <>
      <VenueDetails conference={conference} />
      <About
        title={"DUBAI, United Arab Emirates"}
        content={
          "Dubai, a charming city in the United Arab Emirates, skillfully combines contemporary and heritage. Recognized for the world’s tallest structure, the Burj Khalifa, Dubai offers contemporary architecture, opulent shopping at The Dubai Mall, and the scenic Palm Jumeirah. Take a boat down Dubai Creek, immerse yourself in history at the Al Fahidi District, and experience Jumeirah Mosque culture. Savor a wide range of cuisines, including regional specialties and flavors from around the world. Take a desert adventure, go indoors at Ski Dubai, and unwind on immaculate beaches. Every tourist in Dubai can expect an engaging and varied experience of luxury, culture, and adventure thanks to the city’s vibrant nightlife and world-class events."
        }
      />
      <VenueLocation/>
      <Prospectus />
    </>
  );
}
