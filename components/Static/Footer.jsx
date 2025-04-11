import React from "react";
import footerStyle from "./Footer.module.css";

import Link from "next/link";
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
              <div className="col-md-4  mt-3">
                <Link href={'/contact-us'} >Contact Us</Link>
              </div>
              <div className="col-md-4  mt-3">
                <Link href={'/privacy-policy'} >Privacy Policy</Link>
              </div>
              <div className="col-md-4  mt-3">
                <Link href={'/terms-and-conditions'} >Terms & Conditions</Link>
               
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
