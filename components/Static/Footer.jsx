import React from "react";
import footerStyle from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyle["footer"]}>
      <div className="container">
        <div className={footerStyle["footer-logo"]}>
          <img src="/icons/annex_logo.png" alt="Logo" />
          <br />
          <small className="mt-3 text-white">ANNEX GLOBAL CONFERENCE</small>
        </div>
        <div className={footerStyle["footer-links"]}>
          <div className="col-xl-8 col-md-12 mx-auto">
            <div className="row">
              <div className="col-md-3 col-6 mt-3">
                <a href="#">Blog</a>
              </div>
              <div className="col-md-3 col-6 mt-3">
                <a href="#">Contact Us</a>
              </div>
              <div className="col-md-3 col-6 mt-3">
                <a href="#">Privacy Policy</a>
              </div>
              <div className="col-md-3 col-6 mt-3">
                <a href="#">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-white" />
        <div className={footerStyle["social-icons"]}>
          <a href="#">
            <i className="pi-facebook pi"></i>
          </a>
          <a href="#">
            <i className="pi-youtube pi"></i>
          </a>
          <a href="#">
            <i className="pi-instagram pi"></i>
          </a>
          <a href="#">
            <i className="pi-linkedin pi"></i>
          </a>
        </div>
        <div className={footerStyle["footer-bottom"]}>
          © {new Date().getFullYear()} annexglobal-conference. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
