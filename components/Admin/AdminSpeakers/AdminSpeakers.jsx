'use client'
import React,{useState} from "react";
import SpeakersTabelAdmin from "./SpeakersTabelAdmin/SpeakersTabelAdmin";
import SpeakerBackgroundSelector from "./SpeakerBackgroundSelector";
import Sidenav from "../Dashboard/Sidenav/Sidenav";

export default function AdminSpeakers() {
   const [activeMenu, setActiveMenu] = useState("Speakers");
  
    const navItems = [{ item: "Speakers" }, { item: "Speaker Background" }];
  
    const componentMap = {
      Speakers: <SpeakersTabelAdmin />,
      'Speaker Background': <SpeakerBackgroundSelector />,
    };
  
  return (
    <div className=" p-2">
      <div className="d-flex col-12 justify-content-between align-items-start flex-wrap gap-2 mb-4">
        {/* Title */}
        <h5 className="fw-bold m-0">All Speakers</h5>

        {/* Add New Conference Button */}
        {/* <button className="btn btn-warning text-white col-12 col-md-1">
          Publish
        </button> */}
      </div>
<div className="row gap-2 gap-md-0 p-3">
        <div className="col-12 col-md-3">
          <Sidenav
            navItems={navItems}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div className="col-md-9 col-12 p-3 bg-white rounded-2">
          {componentMap[activeMenu]}
        </div>
      </div>
    </div>
  );
}
