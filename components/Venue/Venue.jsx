import React from "react";
import Prospectus from "../AboutConference/Prospectus/Prospectus";
import About from "../SponsorsExhibitors/About/About";
import VenueDetails from "./VenueDetails/VenueDetails";
import VenueLocation from "./VenueLocation/VenueLocation";
export default function Venue({ conference }) {
  const venueLocation = conference?.venue?.eventTimings || "";
  const aboutVenue = conference?.venue?.content || "";
  const venueDetails = conference?.venue?.headerPanelImages || "";
  const venueMap = conference?.venue?.maps || "";
  const prospectUsContent = conference?.conference?.eventDetails || "";
  const id = conference?._id;
  return (
    <>
      <VenueDetails conference={venueDetails} />
      <About
        title={aboutVenue?.title || "Venue"}
        content={
          aboutVenue?.content || ""
        }
      />
      
      <VenueLocation conference={venueLocation} map={venueMap} />
      <Prospectus conference={prospectUsContent} id={id} />
    </>
  );
}
