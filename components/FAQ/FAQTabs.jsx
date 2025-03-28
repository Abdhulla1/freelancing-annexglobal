'use client';
import { useState } from "react";
import  './style.css';
const faqData = {
  GENERAL: [
    { question: "What Are The Benefits Of Attending Our Conference ?", answer: "Participating in our conference provides the prospect for international exposure through the establishment of speaker and abstract profiles associated with your identity. This exposure can contribute to gaining global recognition. Connect with numerous influential individuals in the fields of obesity and nutritional health and exchange ideas with them. Engaging in individual discussions with distinguished speakers and well-known keynote speakers will serve unique purposes for each conference attendee." },
    { question: "What Are The Advantages For Speaker Participations ?", answer: "Speakers will gain exposure to a broad international audience and have networking opportunities with top professionals." }
  ],
  TICKETS: [
    { question: "What Is The Refund Policy?", answer: "Refunds are available up to 30 days before the event." },
    { question: "Are Group Discounts Available?", answer: "Yes, group discounts are available for more than 5 participants." }
  ],
  "ATTENDING EVENTS": [
    { question: "What Are The Event Timings?", answer: "The event runs from 9 AM to 6 PM each day." },
    { question: "Are Meals Provided?", answer: "Yes, lunch and refreshments are included with your ticket." }
  ]
};

const FAQTabs = () => {
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="faq-container">
      {/* Tabs Section */}
      <div className="tabs">
        {Object.keys(faqData).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="faq-list">
        {faqData[activeTab].map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
              {faq.question}
              <span className="faq-icon">{openFAQ === index ? "−" : "+"}</span>
            </div>
            {openFAQ === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQTabs;
