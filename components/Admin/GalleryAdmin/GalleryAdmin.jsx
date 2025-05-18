'use client'
import React,{useState} from "react";
import GalleryImageUploads from "./GalleryImageUploads";
import Sidenav from "../Dashboard/Sidenav/Sidenav";

export default function GalleryAdmin() {
   const [activeMenu, setActiveMenu] = useState('Gallery Header Images');
  
    const navItems = [{ item: 'Gallery Header Images' },];
  
    const componentMap = {
      'Gallery Header Images': <GalleryImageUploads />,

    };
  
  return (
    <div className=" p-2">
      <div className="d-flex col-12 justify-content-between align-items-start flex-wrap gap-2 mb-4">
        {/* Title */}
        <h5 className="fw-bold m-0">Gallery</h5>

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
        <div className="col-md-9 col-12 p-3 bg-white rounded-2"  >
          {componentMap[activeMenu]}
        </div>
      </div>
    </div>
  );
}
