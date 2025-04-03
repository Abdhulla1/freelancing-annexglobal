"use client";
import { useState } from "react";
import styles from "./PricingTable.module.css";

const pricingOptions = [
  {
    type: "Speaker Registration - 1 Days Entry Ticket",
    early: 322,
    mid: 522,
    final: 722,
  },
  {
    type: "Speaker Registration - 2 Days Entry Ticket",
    early: 322,
    mid: 522,
    final: 722,
  },
  { type: "Poster Registration", early: 322, mid: 522, final: 722 },
  { type: "Delegate Registration", early: 322, mid: 522, final: 722 },
  { type: "Student Registration", early: 322, mid: 522, final: 722 },
  {
    type: "Webinar/Virtual Conference Registration",
    early: 322,
    mid: 522,
    final: 722,
  },
  { type: "Video Presentation", early: 322, mid: 522, final: 722 },
  { type: "E-Poster Presentation", early: 322, mid: 522, final: 722 },
];

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  colSpan = "col-md-6",
}) => {
  return (
    <div className={`mb-3 ${colSpan}`}>
      <label className="form-label">{label}</label>
      <select
        name={name}
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function PricingTable() {
  const [selected, setSelected] = useState({});
  const [activeSelection, setActiveSelection] = useState({});
  const [formData, setFormData] = useState({ currency: "" });

  const handleQuantityChange = (type, change) => {
    setSelected((prev) => {
      const newQty = (prev[type] || 0) + change;
      return newQty > 0 ? { ...prev, [type]: newQty } : { ...prev, [type]: 0 };
    });
  };

  const handleSelection = (type, category) => {
    setActiveSelection((prev) => ({
      ...prev,
      [type]: category,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.tableContainer}>
      <h4 className="text-lg font-semibold mb-4">
        Please choose your preferred pricing option below
      </h4>
      <div className="table-responsive mb-5">
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableCol}>
              <th className={styles.th}>Registration Type</th>
              <th className={styles.th}>Early Bird (31-08-2024)</th>
              <th className={styles.th}>Mid Term (31-08-2024)</th>
              <th className={styles.th}>Final Call (31-08-2024)</th>
              <th className={styles.th}>Qty</th>
            </tr>
          </thead>
          <tbody>
            {pricingOptions.map(({ type, early, mid, final }) => (
              <tr key={type}>
                <td className={`fw-bold text-start ${styles.td}`}>{type}</td>
                <td
                  className={`${styles.td} ${styles.early} ${
                    activeSelection[type] === "early" ? styles.selected : ""
                  }`}
                >
                  <button
                    className={styles.tdButton}
                    onClick={() => handleSelection(type, "early")}
                  >
                    ${early}
                  </button>
                </td>
                <td
                  className={`${styles.td} ${styles.mid} ${
                    activeSelection[type] === "mid" ? styles.selected : ""
                  }`}
                >
                  <button
                    className={styles.tdButton}
                    onClick={() => handleSelection(type, "mid")}
                  >
                    ${mid}
                  </button>
                </td>
                <td
                  className={`${styles.td} ${styles.final} ${
                    activeSelection[type] === "final" ? styles.selected : ""
                  }`}
                >
                  <button
                    className={styles.tdButton}
                    onClick={() => handleSelection(type, "final")}
                  >
                    ${final}
                  </button>
                </td>
                <td className={styles.td}>
                  <div className={styles.qtyContainer}>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleQuantityChange(type, -1)}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>
                      {selected[type] || 0}
                    </span>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleQuantityChange(type, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h5 className="text-start mb-4">Plan Your Stay & Accommodation</h5>
        <div className="row">
          <FormSelect
            label="Occupancy"
            name="occupancy"
            value={formData.occupancy}
            onChange={handleChange}
            options={[
              { value: "", label: "Select occupancy" },
              { value: "single", label: "Single" },
              { value: "double", label: "Double" },
              { value: "suite", label: "Suite" },
            ]}
          />
        </div>
        <div className="row">
          <FormSelect
            label="Period"
            name="period"
            value={formData.period}
            onChange={handleChange}
            options={[
              { value: "one_night", label: "One Night" },
              { value: "two_nights", label: "Two Nights" },
              { value: "week", label: "One Week" },
            ]}
          />
          <FormSelect
            label="Room"
            name="room"
            value={formData.period}
            onChange={handleChange}
            options={[
              { value: "one", label: "One " },
              { value: "two", label: "Two " },
              { value: "three", label: "Three" },
            ]}
          />
        </div>
      </div>
      <div className={styles.tablePricingContainer}>
        <div className={styles.pricingItem}>
          <span>Your Ticket Price</span>
          <div className={styles.line}></div>
          <span className={styles.amount}>$ 0.00</span>
        </div>
        <div className={styles.pricingItem}>
          <span>Accommodation Cost</span>
          <div className={styles.line}></div>
          <span className={styles.amount}>$ 0.00</span>
        </div>
        <div className={styles.netTotal}>
          <span>Net Total</span>
          <span className={styles.totalAmount}>$ 0.00</span>
        </div>
      </div>
    </div>
  );
}
