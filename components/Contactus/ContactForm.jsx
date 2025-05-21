"use client";
import { useState } from "react";
import styles from "./ContactForm.module.css"; // Import CSS module

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    email: "",
    contact: "",
    message: "",
  });
const conferneceData = [
  "Innovations In Diabetes Diagnosis",
  "Diabetes Management And Treatment",
  "Infectious Diseases And Preventive",
  "Advance In Clinical Medicine",
  "Mental Health And Psychological",
  "Global Health And Internal Medicine",
  "Public Health And Nutrition",
];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={`container-fluid d-flex flex-column align-items-center justify-content-center ${styles.contactPage}`}>
      
      {/* Stay Connected Badge */}
      <div className={styles.stayConnected}>
        <img src="/images/home/chat.png" alt="Stay Connected" />
        Stay Connected
      </div>
      <h2 className="text-center text-white mb-3">
      Let's <span className={styles.highlightText}> Discuss The Conference.</span> <br />
          However You First
        </h2>

      {/* Contact Section */}
      <div className={`col-lg-6 col-md-8 col-11 p-5 mt-3 text-white container rounded ${styles.contactForm}`}>
        
        {/* Updated Heading */}
        <h2 className="text-center mb-3">
          Get In Touch
        </h2>

        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">First Name</label>
              <input type="text" name="firstName" className="form-control" placeholder="Enter First Name" onChange={handleChange} />
            </div>
            <div className="col">
              <label className="form-label">Last Name</label>
              <input type="text" name="lastName" className="form-control" placeholder="Enter Last Name" onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Organization Name*</label>
            <input type="text" name="organization" className="form-control" placeholder="Enter Organization" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email ID*</label>
            <input type="email" name="email" className="form-control" placeholder="Enter Email ID" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Number*</label>
            <input type="text" name="contact" className="form-control" placeholder="Enter Contact Number" onChange={handleChange} required />
          </div>
       <div className="mb-4">
                   <label className="block text-white mb-2 font-semibold">
                  Conference Name
                </label>
                <select
                  className="form-control"
                  id="assignUser"
                  value={""}
                  onChange={(e)=>console.log(e.value)}
                  required
                >
                  <option value="" disabled>
                    Select Conference
                  </option>
                  {conferneceData.map((conference, i) => (
                    <option key={i} value={conference}>
                      {conference}
                    </option>
                  ))}
                </select>
              </div>
          <div className="mb-3">
            <label className="form-label">How can we help?</label>
            <textarea name="message" className="form-control" placeholder="Enter Message" rows="4" onChange={handleChange}></textarea>
          </div>

          <button type="submit" className={`brand-btn w-100 ${styles.submitButton}`}>Send</button>
        </form>
      </div>
      <footer className={`${styles.footer} mt-5`}>
        <div className="text-center text-white">
                      {/* <div className={styles.footerHeader}>Contact Info</div> */}
          <div className={`${styles.footerContent} d-flex justify-content-center align-items-center gap-3`}>
                 <div className="text-bold">Contact Info :</div>
            <div className="d-flex align-items-center ms-2">
            
              <img  className={`${styles.icon}`} src="/images/home/mobile.png" alt="mobile"></img>
              <span className="ms-2">+684-708-3090</span>
            </div>
            <div className="d-flex align-items-center ">
            <img  className={`${styles.icon}`} src="/images/home/gmail.png" alt="mobile"></img>
            <span className="ms-2">annexglobalconferemce@gmail.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactForm;
