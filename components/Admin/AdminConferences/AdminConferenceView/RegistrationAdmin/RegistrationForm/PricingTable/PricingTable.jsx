// Updated PricingTable.jsx with renamed keys
import { useState } from "react";
import styles from "./PricingTable.module.css";
import { Dialog } from "primereact/dialog";
import { updatePricingDetails } from "@/service/AdminConfernecePages/confernce";
import { Button } from "primereact/button";

const defaultEntry = {
  registrationType: "Edit Registration Type",
  earlyBirdAmount: 0,
  midBirdAmount: 0,
  finalBirdAmount: 0,
  qty: 0,
};

export default function PricingTable({
  selectedConferenceID,
  pricingTable,
  fetchConfernceData,
  toast,
}) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const actualData = pricingTable.registration || [];
  const filledData = [...actualData];
  while (filledData.length < 10) {
    filledData.push({ ...defaultEntry });
  }
  const [pricingOptions, setPricingOptions] = useState(
    filledData.map((entry) => ({ ...entry, qty: entry.qty || 0 }))
  );

const [editDates, setEditDates] = useState({
  early: actualData?.[0]?.earlyBirdDate || "",
  mid: actualData?.[0]?.midBirDate || "",
  final: actualData?.[0]?.finalBirdDate || "",
});

  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({ header: null, content: null });

  const handleModel = (type, data = null, index = null) => {
    const componentsMap = {
      editPriceValue: {
        header: "Edit Price Value",
        content: (
          <EditPriceValue
            data={{ ...data, index }}
            dates={editDates}
            onHide={setIsVisible}
            onSave={(updatedEntry) => handlePriceUpdate(updatedEntry, index)}
          />
        ),
      },
      editPricingLevelList: {
        header: "Edit Pricing Level List",
        content: (
          <EditPricingLevelList
            data={editDates}
            onHide={setIsVisible}
            onSave={setEditDates}
          />
        ),
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setIsVisible(true);
    }
  };

  const handlePriceUpdate = (updatedEntry, index) => {
    setPricingOptions((prev) =>
      prev.map((entry, i) => (i === index ? { ...updatedEntry, qty: entry.qty } : entry))
    );
    setIsVisible(false);
  };

  const handleQtyChange = (index, direction) => {
    setPricingOptions((prev) =>
      prev.map((entry, i) => {
        if (i === index) {
          const newQty = direction === "inc" ? entry.qty + 1 : Math.max(0, entry.qty - 1);
          return { ...entry, qty: newQty };
        }
        return entry;
      })
    );
  };

  const handleSubmit = async () => {
    if (!editDates.early || !editDates.mid || !editDates.final) {
    toast?.current?.show({
      severity: "warn",
      summary: "Validation Error",
      detail: "Please select all registration deadline dates before submitting.",
    });
    return;
  }


    // Custom validation for all 10 rows
  const incompleteRows = pricingOptions.some((entry) => {
    return (
      entry.registrationType === "Edit Registration Type" ||
      !entry.registrationType.trim() ||
      entry.earlyBirdAmount === 0 ||
      entry.midBirdAmount === 0 ||
      entry.finalBirdAmount === 0 ||
      entry.qty === 0
    );
  });

  if (incompleteRows) {
    toast?.current?.show({
      severity: "warn",
      summary: "Validation Error",
      detail: "Please complete all 10 rows with valid registration type, amounts, and quantity.",
    });
    return;
  }
    setButtonLoading(true);
    // const formattedPayload = {
    //   registration: pricingOptions,
    // };
    const formattedPayload = {
    registration: pricingOptions.map((option) => ({
      ...option,
      earlyBirdDate: editDates.early,
      midBirDate: editDates.mid,
      finalBirdDate: editDates.final,
    })),
  };

    try {
      const response = await updatePricingDetails(selectedConferenceID, formattedPayload);
      if (response.status === 200) {
        toast?.current?.show({
          severity: "success",
          summary: "Saved",
          detail: response.data?.detail?.[0]?.msg || "Pricing data saved.",
        });
        fetchConfernceData();
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Something went wrong",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => setIsVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {sidebarState.content}
      </Dialog>

      <p className="text-muted">Note: Enter the amounts in USD</p>

      <div className="table-responsive mb-5">
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableCol}>
              <th className={`text-start p-2 pe-4 ${styles.th} col-6`}>Registration Type</th>
              <th className={`text-start p-2 ${styles.th} col-4`}>
                Early Bird ({editDates.early}) &nbsp;
                <button
                  className="btn btn-outline-secondary rounded ms-auto"
                  onClick={() => handleModel("editPricingLevelList")}
                >
                  <i className="bx bx-edit-alt"></i>
                </button>
              </th>
              <th className={`text-start p-2 ${styles.th} col-2`}>Qty</th>
            </tr>
          </thead>
          <tbody>
            {pricingOptions.map((option, index) => (
              <tr key={option.registrationType + "-" + index}>
                <td className={`fw-bold text-start p-2 pe-4 ${styles.td}`}>
                  <div className="d-flex align-items-center justify-content-between">
                    {option.registrationType}
                    <button
                      className="btn btn-outline-secondary rounded ms-auto"
                      onClick={() => handleModel("editPriceValue", option, index)}
                    >
                      <i className="bx bx-edit-alt"></i>
                    </button>
                  </div>
                </td>
                <td className={`fw-bold text-start p-2 ${styles.td} ${styles.early}`}>${option.earlyBirdAmount}</td>
                <td className={`fw-bold text-start p-2 ${styles.td}`}>
                  <div className={styles.qtyContainer}>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleQtyChange(index, "dec")}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{option.qty}</span>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleQtyChange(index, "inc")}
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-3">
          <Button
            label="Submit"
            onClick={handleSubmit}
            className="btn px-5 btn-warning text-white"
            loading={buttonLoading}
            style={{ outline: "none", boxShadow: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

function EditPriceValue({ data, dates, onHide, onSave }) {
  const [formData, setFormData] = useState({
    registrationType: data?.registrationType || "",
    earlyBirdAmount: data?.earlyBirdAmount || 0,
    midBirdAmount: data?.midBirdAmount || 0,
    finalBirdAmount: data?.finalBirdAmount || 0,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  function getRegistrationDetails(type) {
    switch (type) {
      case "earlyBirdAmount":
        return `Early Bird (${dates.early || ""})`;
      case "midBirdAmount":
        return `Mid Term (${dates.mid || ""})`;
      case "finalBirdAmount":
        return `Final Call (${dates.final || ""})`;
      default:
        return "Invalid registration type";
    }
  }

  return (
    <div className="p-3">
      <p className="text-info">Note: Enter the amounts in USD</p>
      <label className="form-label">Enter Registration type name</label>
      <input
        type="text"
        className="form-control"
        value={formData.registrationType}
        onChange={(e) => handleChange("registrationType", e.target.value)}
        placeholder="Enter Registration type name"
      />

      <div className="mt-4 mb-3">
        <label className="form-label">List</label>
        <div className="rounded border p-4">
          {["earlyBirdAmount", "midBirdAmount", "finalBirdAmount"].map((key, i) => (
            <div key={i} className="row align-items-end mb-4">
              <div className="col-auto">
                <span
                  className="rounded-circle bg-secondary bg-opacity-10 p-2 d-flex justify-content-center align-items-center"
                  style={{ height: "40px", width: "40px" }}
                >
                  {i + 1}
                </span>
              </div>
              <div
                className="col rounded bg-secondary bg-opacity-25 p-2 fw-semibold"
                style={{ display: "inline-block", fontSize: "13px" }}
              >
                {getRegistrationDetails(key)}
              </div>
              <div className="col">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData[key]}
                  onChange={(e) => handleChange(key, +e.target.value)}
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-center gap-3">
        <button
          className="btn bg-white border px-4"
          onClick={() => onHide(false)}
        >
          Close
        </button>
        <button
          className="btn btn-warning text-white px-4"
          disabled={
            isNaN(formData.earlyBirdAmount) ||
            isNaN(formData.midBirdAmount) ||
            isNaN(formData.finalBirdAmount) ||
            !formData.registrationType.trim()
          }
          onClick={() => onSave(formData)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}


function EditPricingLevelList({ data, onHide, onSave }) {
  const [dates, setDates] = useState(data);

  const handleDateChange = (key, value) => {
    setDates((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-3">
      {Object.entries(dates).map(([key, value]) => (
        <div className="mb-2" key={key}>
          <label className="form-label">
            {key.charAt(0).toUpperCase() + key.slice(1)} Bird (Ending Date)
          </label>
          <input
            type="date"
            className="form-control"
            value={value}
            onChange={(e) => handleDateChange(key, e.target.value)}
          />
        </div>
      ))}
      <div className="mt-3 d-flex justify-content-center gap-3">
        <button
          className="btn bg-white border px-4"
          onClick={() => onHide(false)}
        >
          Close
        </button>
        <button
          className="btn btn-warning text-white px-4"
          onClick={() => {
            onSave(dates);
            onHide(false);
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
