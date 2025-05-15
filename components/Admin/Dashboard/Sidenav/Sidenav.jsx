
import React from "react";
import "./Sidenav.css";

export default function Sidenav({ navItems, activeMenu,setActiveMenu }) {
  return (
    <div className="bg-white rounded-2 p-2">
      {navItems.map(({item}, i) => (
        <div key={i} className={`p-3 tab  ${activeMenu===item ? 'active':''}`} onClick={(e)=>setActiveMenu(item)}>
          {item}
        </div>
      ))}
    </div>
  );
}
