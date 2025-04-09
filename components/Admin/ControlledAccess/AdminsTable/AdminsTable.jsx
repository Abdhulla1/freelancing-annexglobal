import React from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
export default function AdminsTable({ adminsData }) {
  const confirmReset = () => {
    const accept = () => {
      console.log("accepted");
    };
    const reject = () => {
      console.log("rejectcted");
    };
    confirmDialog({
      message:
        "Resetting the user will delete all of their restrictions, Confirm?",
      acceptLabel: "OK",
      rejectLabel: "Cancel",
      acceptClassName: "btn px-5 btn-warning text-white shadow-none", // Remove focus outline
      rejectClassName: "btn px-5 bg-white border me-3 shadow-none", // Remove focus outline
      defaultFocus: "accept",
      accept,
      reject,
      className: "custom-confirm-dialog ",
    });
  };
  return (
    <div className="table-responsive">
      <ConfirmDialog draggable={false} />
      <table className="tabel w-100">
        <thead>
          <tr>
            <td className="p-2 table-heading">ID</td>
            <td className="p-2 table-heading">Email ID</td>
            <td className="p-2 table-heading">Expiring In</td>
            <td className="p-2 table-heading">Last Logged In</td>
            <td className="p-2 table-heading">Status</td>
            <td className="p-2 table-heading">Action</td>
          </tr>
        </thead>
        <tbody>
          {adminsData.map((element, i) => (
            <tr key={i}>
              <td className="p-3 text-nowrap  table-data">{element.id}</td>
              <td className="p-3 text-nowrap  table-data">{element.emailId}</td>
              <td className="p-3 text-nowrap  table-data">
                {element.expiringIn}
              </td>
              <td className="p-3 text-nowrap  table-data">
                {element.lastLoggedIn}
              </td>
              <td
                className={`p-3 text-nowrap  table-data ${
                  element.status == "Active" ? "text-success" : "text-danger"
                }`}
              >
                {element.status}
              </td>

              <td className="p-3 table-data d-flex gap-1">
                <button className="btn  btn-outline-secondary rounded">
                  <i className="bx bx-edit-alt"></i>
                </button>
                <button className="btn  btn-outline-secondary rounded">
                  <i className="bx bx-trash-alt"></i>
                </button>
                <button
                  onClick={confirmReset}
                  className="btn  btn-outline-secondary rounded"
                >
                  <i className="bx bx-refresh"></i>
                </button>
                <button className="btn  btn-outline-secondary rounded">
                  <i className="bx bx-lock"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
