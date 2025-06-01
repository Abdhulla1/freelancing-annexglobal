import { useState, useEffect } from "react";
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

export default function PricingTable({ onTotalChange ,selectedCurrency,getSymbol}) {
    const [result, setResult] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedPrices, setConvertedPrices] = useState([]);
  useEffect(() => {
    async function fetchExchangeRate() {
      try {
        if (!selectedCurrency || selectedCurrency === 'USD') {
          setExchangeRate(1); // No conversion needed for USD
          return;
        }
        const res = await fetch(`https://api.frankfurter.app/latest?from=USD&to=${selectedCurrency}`);
        const data = await res.json();
            console.log("Exchange rate API response:", data);
        const rate = data.rates[selectedCurrency];
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setExchangeRate(1);
      }
    }
    fetchExchangeRate();
  }, [selectedCurrency]);

  // Convert pricing options whenever exchangeRate changes
  useEffect(() => {
    const converted = pricingOptions.map(({ type, early, mid, final }) => ({
      type,
      early: Math.round(early * exchangeRate * 100) / 100,
  mid: Math.round(mid * exchangeRate * 100) / 100,
  final: Math.round(final * exchangeRate * 100) / 100,
    }));
    setConvertedPrices(converted);
  }, [exchangeRate]);



  // const getSymbol = (currency) => {
  //   return currencySymbols[currency] || '';
  // };

  const [selected, setSelected] = useState(() => {
    const stored = sessionStorage.getItem("pricingSelected");
    return stored ? JSON.parse(stored) : {};
  });

  const [activeSelection, setActiveSelection] = useState(() => {
    const stored = sessionStorage.getItem("pricingActiveSelection");
    return stored ? JSON.parse(stored) : {};
  });

  const [formData, setFormData] = useState(() => {
    const stored = sessionStorage.getItem("pricingFormData");
    return stored ? JSON.parse(stored) : {
      occupancy: "",
      period: "",
      room: "",
    };
  });

  useEffect(() => {
    const storedSelected = sessionStorage.getItem("pricingSelected");
    const storedSelection = sessionStorage.getItem("pricingActiveSelection");
    const storedFormData = sessionStorage.getItem("pricingFormData");
    const storedTotals = sessionStorage.getItem("pricingTotals");

    if (storedSelected) setSelected(JSON.parse(storedSelected));
    if (storedSelection) setActiveSelection(JSON.parse(storedSelection));
    if (storedFormData) setFormData(JSON.parse(storedFormData));
    if (storedTotals) onTotalChange?.(JSON.parse(storedTotals));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("pricingSelected", JSON.stringify(selected));
    sessionStorage.setItem("pricingActiveSelection", JSON.stringify(activeSelection));
    sessionStorage.setItem("pricingFormData", JSON.stringify(formData));
  }, [selected, activeSelection, formData]);

  const handleQuantityChange = (type, change) => {
    setSelected((prev) => {
      const newQty = (prev[type] || 0) + change;
      return newQty > 0 ? { ...prev, [type]: newQty } : { ...prev, [type]: 0 };
    });
  };

  const handleSelection = (type, category) => {
    setActiveSelection((prev) => {
      if (prev[type] === category) {
        // Deselect the option if it's already selected
        setSelected((prevSelected) => ({
          ...prevSelected,
          [type]: 0,
        }));
        return { ...prev, [type]: "" }; // Deselect the option
      } else {
        // Select the new category
        setSelected((prevSelected) => ({
          ...prevSelected,
          [type]: 1, 
        }));
        return { ...prev, [type]: category }; // Update selection
      }
    });
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTicketPrice = () => {
    return Object.entries(selected).reduce((total, [type, qty]) => {
      const category = activeSelection[type];
      if (!category || qty === 0) return total;

      const option = convertedPrices.find((opt) => opt.type === type);
      const price = option?.[category] || 0;
      return total + price * qty;
    }, 0);
  };

  const calculateAccommodationCost = () => {
    const { occupancy, period, room } = formData;
    if (!occupancy || !period || !room) return 0;

    const basePrices = {
      single: 100,
      double: 150,
      suite: 250,
    };

    const periodMultiplier = {
      one_night: 1,
      two_nights: 2,
      week: 7,
    };

    const occupancyCost =  parseInt(occupancy)|| 0;
    const nights =  parseInt(period) || 0;
    const rooms = parseInt(room) || 0;

    return occupancyCost * nights * rooms;
  };

  const ticketTotal = calculateTicketPrice();
  const accommodationTotal = calculateAccommodationCost();
  const netTotal = ticketTotal + accommodationTotal;

  useEffect(() => {
    const totalData = {
      ticketTotal,
      accommodationTotal,
      netTotal,
    };
    sessionStorage.setItem("pricingTotals", JSON.stringify(totalData));
    onTotalChange?.(totalData);
  }, [ticketTotal, accommodationTotal, netTotal]);

  useEffect(() => {
  const registration = Object.entries(selected).reduce((acc, [type, qty]) => {
    if (qty > 0 && activeSelection[type]) {
      acc[type] = {
        category: activeSelection[type],
        quantity: qty,
        price: convertedPrices.find(opt => opt.type === type)?.[activeSelection[type]] || 0
      };
    }
    return acc;
  }, {});

  // Build the pricing object
  const pricing = {
    registration,
    occupancy: formData.occupancy,
    period: formData.period,
    room: formData.room,
    ticketPrice: ticketTotal,
    accommodationCost: accommodationTotal,
    total: netTotal,
  };

  // Store to sessionStorage if needed
  sessionStorage.setItem("pricingTotals", JSON.stringify(pricing));

  // Pass it to parent
  onTotalChange?.(pricing);
}, [ticketTotal, accommodationTotal, netTotal, selected, activeSelection, formData, convertedPrices]);



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
            {convertedPrices.map(({ type, early, mid, final }) => (
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
                    {getSymbol(selectedCurrency)}{early.toFixed(2)}
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
                    {getSymbol(selectedCurrency)}{mid.toFixed(2)}
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
                    {getSymbol(selectedCurrency)}{final.toFixed(2)}
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
              { value: "120", label: "Single ($120)" },
              { value: "150", label: "Double ($150)" },
      
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
              { value: "", label: "Select period" },
              { value: "1", label: "One Night" },
              { value: "2", label: "Two Nights" },
              { value: "3", label: "Three Nights" },
            ]}
          />
          <FormSelect
            label="Room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            options={[
              { value: "", label: "Select room count" },
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
            ]}
          />
        </div>
      </div>
      <div className={styles.tablePricingContainer}>
        <div className={styles.pricingItem}>
          <span>Your Ticket Price</span>
          <div className={styles.line}></div>
          <span className={styles.amount}>{getSymbol(selectedCurrency)}{ticketTotal.toFixed(2)}</span>
        </div>
        <div className={styles.pricingItem}>
          <span>Accommodation Cost</span>
          <div className={styles.line}></div>
          <span className={styles.amount}>{getSymbol(selectedCurrency)}{accommodationTotal.toFixed(2)}</span>
        </div>
        <div className={styles.netTotal}>
          <span>Net Total</span>
          <span className={styles.totalAmount}>{getSymbol(selectedCurrency)}{netTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
