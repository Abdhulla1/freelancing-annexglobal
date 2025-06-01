import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Honeycombtab.module.css"; // Import the CSS module

const categories = [
  ["ENT"],
  ["ALL", "DIABETES"],
  ["HEALTHCARE", "NEUROSCIENCE", "CARDIOLOGY"],
  ["NUTRITION", "GYNAECOLOGY", "DERMATOLOGY", "NUTRITION"],
  ["SURGERY", "ORTHOPEDICS", "NURSING"],
  ["ENT", "CANCER"],
  ["ENT"],
];

const HoneycombTabs = ({data}) => {
  const finalCategories = data || categories; // Use provided data or default categories
  if (!data || !data.length) {
    return null; // Return null if data is empty or undefined
  }
  const [selected, setSelected] = useState("ALL");

  const handleClick = (category) => {
    setSelected(category);
  };

  return (
    <div className={`container d-none d-md-flex ${styles.honeycombContainer}`}>
      {finalCategories.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((category, colIndex) => (
            <button
              key={colIndex}
              className={`${styles.honeycombButton} ${category === selected ? styles.selected : ""}`}
              onClick={() => handleClick(category)}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HoneycombTabs;
