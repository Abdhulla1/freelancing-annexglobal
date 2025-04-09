
import React from "react";
import "./Sidnav.css";

export default function Sidnav({ navItems, activeTab,setActivetab }) {
  return (
    <div className="bg-white rounded-2 p-2">
      {navItems.map(({item}, i) => (
        <div key={i} className={`p-3 tab  ${activeTab===item ? 'active':''}`} onClick={(e)=>setActivetab(item)}>
          {item}
        </div>
      ))}
    </div>
  );
}
