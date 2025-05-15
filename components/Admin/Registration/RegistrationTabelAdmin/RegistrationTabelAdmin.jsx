"use client";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Image from "next/image";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
const couponData = [
  {
    couponCode: "CONF2025",
    discountType: "Fixed Amount",
    expiryDate: "15 Mar 2025",
  },
  {
    couponCode: "VIPACCESS",
    discountType: "Percentage",
    expiryDate: "15 Mar 2025",
  },
  {
    couponCode: "CONF2025",
    discountType: "Fixed Amount",
    expiryDate: "15 Mar 2025",
  },
  {
    couponCode: "VIPACCESS",
    discountType: "Percentage",
    expiryDate: "15 Mar 2025",
  },
  {
    couponCode: "CONF2025",
    discountType: "Fixed Amount",
    expiryDate: "15 Mar 2025",
  },
];

export default function RegistrationTabelAdmin({
  visibleDetails,
  setVisibleDetails,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarState, setSidebarState] = useState({
    header: null,
    content: null,
  });

  const [statusChecked, setStatusChecked] = useState(false);
  const confirmDelete = () => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejectcted");
    };
    confirmDialog({
      message: <Delete />,
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none",
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none",
      defaultFocus: "accept",
      accept,
      reject,
      className: "custom-confirm-dialog",
    });
  };
  const handleModel = (type, data = null) => {
    const componentsMap = {
      view: {
        header: "View Coupons",
        content: <View data={data} />,
      },
      edit: {
        header: "Edit Coupons",
        content: <Edit data={data} />,
      },
      add: {
        header: "Add Coupons",
        content: <Add />,
      },
    };

    const selected = componentsMap[type];
    if (selected) {
      setSidebarState(selected);
      setIsVisible(true);
    }
  };
  return (
    <div className="table-responsive">
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
      <ConfirmDialog draggable={false} />
      <table className="tabel w-100  table-striped-columns">
        <thead>
          <tr>
            <td className="p-2 table-heading">Coupon Code</td>
            <td className="p-2 table-heading">Discount Type</td>
            <td className="p-2 table-heading">Expiry Date</td>
            <td className="p-2 table-heading">Status</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {couponData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 table-data">{element.couponCode}</td>
              <td className="p-3 table-data">{element.discountType}</td>
              <td className="p-3 table-data">{element.expiryDate}</td>
              <td className="p-3 table-data">
                <InputSwitch
                  checked={statusChecked}
                  onChange={(e) => setStatusChecked(e.value)}
                  style={{ scale: "0.7" }}
                />
              </td>
              <td className="p-3 table-data">
                <div className="d-flex gap-1 justify-content-center flex-nowrap">
                  <button
                    name="edit"
                    className="btn btn-outline-secondary rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded"
                    onClick={confirmDelete}
                  >
                    <i className="bx bx-trash-alt"></i>
                  </button>
                  {/* <button
                    name="view"
                    className="btn btn-outline-warning rounded"
                    onClick={(e) => handleModel(e.target.name, element)}
                  >
                    <i className="bx bx-chevron-right"></i>
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        name="add"
        className="btn btn-lg text-white rounded-circle  btn-warning position-absolute"
        style={{ bottom: "50px", right: "50px", zIndex: 1000 }}
        onClick={(e) => handleModel(e.target.name)}
      >
        +
      </button>
    </div>
  );
}

function Edit({ data }) {
  return (
    <div className="d-flex gap-3 container flex-column h-100">
      <div className="row">
        <div className="col-6">
          <label htmlFor="couponCode" className="form-label">
          Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            value={data.couponCode}
            className="form-control"
            id="couponCode"
            placeholder="Enter Coupon Code"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
        <div className="col-6">
  <label htmlFor="discountType" className="form-label">Discount Type*</label>
  <select
    name="discountType"
    id="discountType"
    className="form-control"
    onChange={(e) => console.log(e.target.value)}
    required
  >
    <option value="">Select Discount Type</option>
    <option value="Percentage">Percentage</option>
    <option value="Fixed Rate">Fixed Rate</option>
  </select>
</div>

      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="discountValue" className="form-label">
          Discount Value
          </label>
          <input
            type="text"
            name="discountValue"
            className="form-control"
            id="discountValue"
            placeholder="Enter Discount Value"
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="date" className="form-label">
          Start & End Date*
          </label>
          <input
            type="text"
            name="date"
            value={data.expiryDate}
            className="form-control"
            id="date"
            placeholder="Enter Discount Value"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>

      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="discountValue" className="form-label">
          Applicable Registration type
          </label>
          <input
            type="text"
            name="registrationtype"
            value={data.name}
            className="form-control"
            id="registrationtype"
            placeholder="Enter Applicable Registration type"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
      </div>

    </div>
  );
}
function Add({ data }) {
  return (
    <div className="d-flex gap-3 container flex-column h-100">
      <div className="row">
        <div className="col-6">
          <label htmlFor="couponCode" className="form-label">
          Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            className="form-control"
            id="couponCode"
            placeholder="Enter Coupon Code"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
        <div className="col-6">
  <label htmlFor="discountType" className="form-label">Discount Type*</label>
  <select
    name="discountType"
    id="discountType"
    className="form-control"
    onChange={(e) => console.log(e.target.value)}
    required
  >
    <option value="">Select Discount Type</option>
    <option value="Percentage">Percentage</option>
    <option value="Fixed Rate">Fixed Rate</option>
  </select>
</div>

      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="discountValue" className="form-label">
          Discount Value
          </label>
          <input
            type="text"
            name="discountValue"
            className="form-control"
            id="discountValue"
            placeholder="Enter Discount Value"
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="date" className="form-label">
          Start & End Date*
          </label>
          <input
            type="text"
            name="date"
            className="form-control"
            id="date"
            placeholder="Enter Discount Value"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>

      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="discountValue" className="form-label">
          Applicable Registration type
          </label>
          <input
            type="text"
            name="registrationtype"
            className="form-control"
            id="registrationtype"
            placeholder="Enter Applicable Registration type"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
      </div>

    </div>
  );
}


function View({ data }) {
  return (
    <div className="d-flex gap-4 flex-column">
      <div>
        <label className="form-label  mb-2">Name</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.name}</p>
      </div>
      <div>
        <label className="form-label  mb-2">Title</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">{data.title}</p>
      </div>
      <label className="form-label">Speaker Image</label>
      <div>
        <label className="form-label mb-2">Bio-Data</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          Dubai, a charming city in the United Arab Emirates, skillfully
          combines contemporary and heritage. Recognized for the 
          world’s tallest structure, the Burj Khalifa, Dubai offers contemporary
          architecture,
        </p>
      </div>
      <div>
        <label className="form-label mb-2">Company</label>
        <p className="bg-secondary bg-opacity-10 rounded-2 p-2">
          {data.company}
        </p>
      </div>
    </div>
  );
}

function Delete({ data = null }) {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <Image src="/icons/delete.png" width={80} height={80} alt="DeleteIcon" />
      <h5 className="mt-3">Delete Coupon</h5>
      <p className="mb-0 col-md-8">
        Are you sure you want to delete this Program File? This action cannot be
        undone.
      </p>
    </div>
  );
}
