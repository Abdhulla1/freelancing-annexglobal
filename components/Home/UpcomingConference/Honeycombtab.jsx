import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Honeycombtab.module.css";

const rowLengths = [1, 2, 3, 4, 3, 2, 1]; // define honeycomb shape

const HoneycombTabs = ({ data }) => {
  if (!data || !data.length) return null;

  // Slice data into rows according to rowLengths
  const rows = [];
  let start = 0;
  for (let len of rowLengths) {
    rows.push(data.slice(start, start + len));
    start += len;
  }

  const [selected, setSelected] = useState("ALL");

  const handleClick = (category) => {
    setSelected(category);
  };

  return (
    <div className={`container d-none d-md-flex ${styles.honeycombContainer}`}>
      {rows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((category, colIndex) => (
            <button
              key={colIndex}
              className={`${styles.honeycombButton} ${
                category.trim() === selected ? styles.selected : ""
              }`}
              onClick={() => handleClick(category.trim())}
            >
              <span>{category.trim()}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HoneycombTabs;
