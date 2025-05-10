import React from "react";
import footerStyle from "./Footer.module.css";

import Link from "next/link";
const Footer = () => {
  return (
    <footer className={footerStyle["footer"]}>
      <div className="container">
        <div className={footerStyle["footer-logo"]}>
          <img src="/icons/annex_logo.png" alt="Logo" />
          <small className="ms-3 text-white">
            {" "}
            Dubai, UAE • 26-27 February 2025
          </small>
        </div>
        <div className="mt-4 col">
          <small className="ms-3 text-white ">
            {" "}
            # Annex Global conference{" "}
          </small>
          <div className="d-inline-flex justify-content-center gap-3">
            <i className="bx bxl-facebook text-white fs-6"></i>
            <i className="bx bxl-instagram text-white fs-6"></i>
            <i className="bx bxl-linkdin text-white fs-6"></i>
            <i className="bx bxl-whatsapp text-white fs-6"></i>
            <i className="pi pi-twitter text-white fs-6"></i>
            <i className="bx bxl-youtube text-white fs-6"></i>
            <Link
              href={"#"}
              className="text-decoration-none text-warning ms-3 text-center"
            >
              Back to top
            </Link>{" "}
          </div>
        </div>
        <hr
          className="bg-white"
          style={{
            height: "2px",
            border: "none",
            color: "#FFFFFF4D",
            backdropFilter: "blur(4px)",
          }}
        />
        <div className={footerStyle["footer-links"]}>
          <div className="col-xl-8 col-md-12 mx-auto">
            <div className="d-flex justify-content-center flex-wrap text-white">
              <Link href={"/contact-us"}>Contact Us</Link> •
              <Link href={"/privacy-policy"}> Privacy Policy</Link> •
              <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
            </div>
          </div>
        </div>
    
        <div className={footerStyle["footer-bottom"]}>
        <p className="text-white opacity-75 text-center ">
          2 Frederick Street, Kings Cross, London, WC1X 0ND, United Kingdom
        </p>
          © {new Date().getFullYear()} AG Medical Conference. All Rights
          Reserved • Contact us at:{" "}
          <a
            href="mailto:gynecology@annexglobalconferences.com"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            gynecology@annexglobalconferences.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
