import React from "react";
import Link from "next/link";

export default function Button({ href = "/upcoming-conference", label = "Conference", icon = "pi-arrow-right pi" }) {
  return (
    <div className="mt-3 mt-md-5">
      <button className="brand-btn  ">
        <Link
          href={href}
          className="d-flex align-items-center mb-0 text-decoration-none h6 fw-bold"
        >
          {label} &nbsp; <i className={icon}></i>
        </Link>
      </button>
    </div>
  );
}
