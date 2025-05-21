'use client';
import { useState,useRef,useEffect } from "react";
import styles from "./FAQTabs.module.css"; // Import module CSS
import QueriesAnswered from "../QueriesAnswered/QueriesAnswered";
import { Button } from "primereact/button"; // Import PrimeReact Button
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const faqData = {
  GENERAL: [
    { question: "What are the benefits of attending our conference ?", answer: "Participating in our conference provides the prospect for international exposure through the establishment of speaker and abstract profiles associated with your identity. This exposure can contribute to gaining global recognition. Connect with numerous influential individuals in the fields of obesity and nutritional health and exchange ideas with them. Engaging in individual discussions with distinguished speakers and well-known keynote speakers will serve unique purposes for each conference attendee." },
    { question: "What are the advantages for speaker participations ?", answer: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos iure optio, quod, libero non ea eaque magnam sit facilis corrupti quam tenetur numquam esse praesentium minima culpa ducimus, molestias quisquam? " },
    { question: "What are the advantages for delegate participations ?", answer: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos iure optio, quod, libero non ea eaque magnam sit facilis corrupti quam tenetur numquam esse praesentium minima culpa ducimus, molestias quisquam? " },
    { question: "Target audience for gynecology conference ?", answer: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos iure optio, quod, libero non ea eaque magnam sit facilis corrupti quam tenetur numquam esse praesentium minima culpa ducimus, molestias quisquam? " },
    { question: "What are the advantages for speaker participations ?", answer: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos iure optio, quod, libero non ea eaque magnam sit facilis corrupti quam tenetur numquam esse praesentium minima culpa ducimus, molestias quisquam? " },
    { question: "What are the advantages for speaker participations ?", answer: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos iure optio, quod, libero non ea eaque magnam sit facilis corrupti quam tenetur numquam esse praesentium minima culpa ducimus, molestias quisquam? " },
     {
    question: "Anything else?",
    answer: 'If you have any other queries or require further information, please feel free to <a href="/contact-us" style="color: blue; text-decoration: underline;">contact us</a>. We’re here to help!'
  }
  ],
  TICKETS: [
    { question: "What Is The Refund Policy?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos exercitationem culpa totam adipisci eligendi, nam rem, ad porro, nostrum asperiores amet modi quod voluptate corrupti cumque! Alias, quas exercitationem." },
    { question: "Are Group Discounts Available?", answer: "Yes, group discounts are available for more than 5 participants. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos exercitationem culpa totam adipisci eligendi, nam rem, ad porro, nostrum asperiores amet modi quod voluptate corrupti cumque! Alias, quas exercitationem." }
  ],
  "ATTENDING EVENTS": [
    { question: "What Are The Event Timings?", answer: "The event runs from 9 AM to 6 PM each day. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos exercitationem culpa totam adipisci eligendi, nam rem, ad porro, nostrum asperiores amet modi quod voluptate corrupti cumque! Alias, quas exercitationem." },
    { question: "Are Meals Provided?", answer: "Yes, lunch and refreshments are included with your ticket. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos exercitationem culpa totam adipisci eligendi, nam rem, ad porro, nostrum asperiores amet modi quod voluptate corrupti cumque! Alias, quas exercitationem." }
  ],
};
const FAQTabs = () => {
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [showScroll, setShowScroll] = useState({ left: false, right: false });
  const tabsRef = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      if (tabsRef.current) {
        setShowScroll({
          left: tabsRef.current.scrollLeft > 0,
          right: tabsRef.current.scrollLeft < tabsRef.current.scrollWidth - tabsRef.current.clientWidth
        });
      }
    };

    checkScroll(); // Check initially
    tabsRef.current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll); // Re-check on resize

    return () => {
      tabsRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: direction === "right" ? 100 : -100, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.containerWraper}>
      <div className={`container p-5 ${styles.faqContainer}`}>
        {/* Tabs Section */}
        <div className={styles.tabsWrapper}>
          {/* Left Scroll Icon */}
          {showScroll.left && (
            <Button
              icon="pi pi-angle-left"
              className={styles.scrollIcon}
              onClick={() => scrollTabs("left")}
            />
          )}

          {/* Tabs */}
          <div className={styles.tabs} ref={tabsRef}>
            {Object.keys(faqData).map((tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Scroll Icon */}
          {showScroll.right && (
            <Button
              icon="pi pi-angle-right"
              className={styles.scrollIcon}
              onClick={() => scrollTabs("right")}
            />
          )}
        </div>

        {/* Pass filtered data to QueriesAnswered */}
        <QueriesAnswered faqData={faqData[activeTab]} />
      </div>
    </div>
  );
};

export default FAQTabs;
