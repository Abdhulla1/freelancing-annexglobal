import { useState, useEffect } from "react";
import styles from "./PricingTable.module.css";
import { Dialog } from "primereact/dialog";

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

export default function PricingTable({ onTotalChange }) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });
  const handleModel = (type, data = null) => {
    const componentsMap = {
      editPriceValue: {
        header: "Edit Price Value ",
        content: <EditPriceValue data={data} onHide={setIsVisible} />,
      },
      editQtyValue: {
        header: "Edit Qty",
        content: <EditQtyValue data={data} onHide={setIsVisible} />,
      },
      editRegistrationTitle: {
        header: "Edit Registration Title",
        content: <EditTitle data={data} />,
      },
      editPricingLevelList: {
        header: "Edit Pricing Level List",
        content: <EditPricingLevelList data={data} onHide={setIsVisible} />,
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setIsVisible(true);
    }
  };
  return (
    <div className={styles.tableContainer}>
      <Dialog
        header={sidebarState.header}
        visible={isVisible}
        draggable={false}
        onHide={() => {
          if (!isVisible) return;
          setIsVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* Content Area */}
        {sidebarState.content}
      </Dialog>
      <div className="table-responsive mb-5">
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableCol}>
              <th className={`text-start p-2 pe-4 ${styles.th} col-6 `}>
                <div className="d-flex align-items-center justify-content-between">
                  Registration Type &nbsp;{" "}
                  {/* <button
                    name="editRegistrationTitle"
                    className="btn btn-outline-secondary rounded ms-auto"
                    onClick={(e) =>
                      handleModel(e.target.name, "Registration Type")
                    }
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button> */}
                </div>
              </th>
              <th className={`text-start p-2 ${styles.th} col-4`}>
                <div className="d-flex align-items-center justify-content-between">
                  Early Bird (31-08-2024) &nbsp;{" "}
                  <button
                    name="editPricingLevelList"
                    className="btn btn-outline-secondary rounded ms-auto"
                    onClick={(e) =>
                      handleModel(
                        e.target.name,
                        "Choose your preferred currency for a seamless experience."
                      )
                    }
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                </div>
              </th>

              <th className={`text-start p-2 ${styles.th} col-2`}>
                <div className="d-flex align-items-center justify-content-between">
                  Qty &nbsp;{" "}
                  {/* <button
                    name="editQtyValue"
                    className="btn btn-outline-secondary rounded ms-auto"
                    onClick={(e) => handleModel(e.target.name, "Qty")}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button> */}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {pricingOptions.map(({ type, early, mid, final }) => (
              <tr key={type}>
                <td className={`fw-bold text-start p-2 pe-4 ${styles.td}`}>
                  <div className="d-flex align-items-center justify-content-between">
                    {type}&nbsp;{" "}
                    <button
                      name="editPriceValue"
                      className="btn btn-outline-secondary rounded ms-auto"
                      onClick={(e) =>
                        handleModel(e.target.name, { type, early, mid, final })
                      }
                    >
                      <i className="bx bx-edit-alt"></i>
                    </button>
                  </div>
                </td>
                <td
                  className={` fw-bold text-start p-2 ${styles.td} ${styles.early}`}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    ${early}&nbsp;
                    <button
                      name="editPriceValue"
                      className="btn btn-outline-secondary rounded ms-auto"
                      onClick={(e) =>
                        handleModel(e.target.name, { type, early, mid, final })
                      }
                    >
                      <i className="bx bx-edit-alt"></i>
                    </button>
                  </div>
                </td>

                <td className={` fw-bold text-start p-2 ${styles.td}`}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className={styles.qtyContainer}>
                      <button className={styles.qtyButton}>-</button>
                      <span className={styles.qtyValue}>{0}</span>
                      <button className={styles.qtyButton}>+</button>
                    </div>
                    &nbsp;{" "}
                    <button
                      name="editQtyValue"
                      className="btn btn-outline-secondary rounded ms-auto"
                      onClick={(e) => handleModel(e.target.name, "Qty")}
                    >
                      <i className="bx bx-edit-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function EditTitle({ data, onHide }) {
  return (
    <div className="p-3">
      <label className="form-label">Title Name</label>
      <input
        type="text"
        name="couponCode"
        value={data}
        className="form-control"
        id="couponCode"
        placeholder="Select Currency"
        onChange={(e) => console.log(e.target.value)}
        required
      />{" "}
      <div className="mt-4 p-2 d-flex justify-content-center align-items-center gap-3 w-100">
        <button
          className="btn px-5 bg-white border"
          onClick={() => setIsVisible(false)}
        >
          Close
        </button>
        <button className="btn px-5 btn-warning text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
function EditPriceValue({ data, onHide }) {
  const { type, early, mid, final } = data;

  function getRegistrationDetails(type) {
    switch (type) {
      case "early":
        return "Early Bird (31-08-2025)";
      case "mid":
        return "Mid Term (31-01-2026)";
      case "final":
        return "Final Call (08-05-2026)";
      default:
        return "Invalid registration type";
    }
  }

  const registrationArray = [
    { key: "early", value: early },
    { key: "mid", value: mid },
    { key: "final", value: final },
  ];

  return (
    <div className="p-3">
      <label className="form-label">Enter Registration type name</label>
      <input
        type="text"
        name="couponCode"
        value={type}
        className="form-control"
        placeholder="Enter Registration type name"
        onChange={(e) => console.log(e.target.value)}
        required
      />

      <div className="mt-4 mb-3">
        <label className="form-label">List</label>
        <div className="rounded border p-4">
          {registrationArray.map((entry, i) => (
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
                className=" col rounded bg-secondary bg-opacity-25 p-2  fw-semibold"
                style={{ display: "inline-block", fontSize: "13px" }}
              >
                {getRegistrationDetails(entry.key)}
              </div>

              <div className="col">
                <label className="form-label">Label</label>
                <input
                  type="text"
                  className="form-control"
                  value={entry.value}
                  onChange={(e) => console.log("Label:", e.target.value)}
                  placeholder="Enter label"
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">Value</label>
                <input
                  type="text"
                  className="form-control"
                  value={entry.value}
                  onChange={(e) => console.log("Value:", e.target.value)}
                  placeholder="Enter value"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-center gap-3 w-100">
        <button
          className="btn px-5 bg-white border"
          onClick={() => onHide(false)}
        >
          Close
        </button>
        <button className="btn px-5 btn-warning text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
function EditQtyValue({ data, onHide }) {
  return (
    <div className="p-3">
      {/* <label className="form-label">Enter Quntity name</label>
      <input
        type="text"
        name="couponCode"
        value={data}
        className="form-control"
        placeholder="Enter Quntity name"
        onChange={(e) => console.log(e.target.value)}
        required
      /> */}

      <div className="mt-4 mb-3">
        <label className="form-label">Number</label>
        <div className="rounded border p-4">
          <div className="row align-items-end mb-4">
            <div className="col">
              <label className="form-label">Min</label>
              <input
                type="number"
                className="form-control"
                value={1}
                onChange={(e) => console.log("Label:", e.target.value)}
                placeholder="Enter label"
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Max</label>
              <input
                type="number"
                className="form-control"
                value={10}
                onChange={(e) => console.log("Value:", e.target.value)}
                placeholder="Enter value"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-center gap-3 w-100">
        <button
          className="btn px-5 bg-white border"
          onClick={() => onHide(false)}
        >
          Close
        </button>
        <button className="btn px-5 btn-warning text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
function EditPricingLevelList({ data, onHide }) {
  return (
    <div className="p-3">
      <div className="mb-2">
        <label className="form-label">Early Bird (Ending Date)</label>
        <input
          type="date"
          name="couponCode"
          value={'Early Bird'}
          className="form-control"
          placeholder="Enter Level name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Mid Term (Ending Date)</label>
        <input
          type="date"
          name="couponCode"
          value={'Mid Team'}
          className="form-control"
          placeholder="Enter Level name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Final Call (Ending Date)</label>
        <input
          type="date"
          name="couponCode"
          value={'Final Call'}
          className="form-control"
          placeholder="Enter Level name"
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </div>


      <div className="mt-4 d-flex justify-content-center gap-3 w-100">
        <button
          className="btn px-5 bg-white border"
          onClick={() => onHide(false)}
        >
          Close
        </button>
        <button className="btn px-5 btn-warning text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
