import React from "react";
import styles from "./TermsAndConditionsContent.module.css";

const TermsAndConditionsContent = () => {
  //  Store subheadings and content as an array
  const termsData = [
    {
      subHeading: "Responsibility Notice:",
      content:
        "All attendees are solely responsible for the safety and security of their personal belongings while at the conference hotel. The organizers assume no responsibility for any missing or stolen items belonging to any individual, regardless of the circumstances.",
    },
    {
      subHeading: "Invitation Letter:",
      content:
        "Kindly note that letters of invitation will be exclusively dispatched via postal mail to registered participants. We regret to inform you that we are unable to accommodate requests for invitation letters through alternative methods.",
    },
    {
      subHeading: "Cancellation Policy:",
      content:
        "Kindly note that letters of invitation will be exclusively dispatched via postal mail to registered participants. We regret to inform you that we are unable to accommodate requests for invitation letters through alternative methods.",
    },
    {
      subHeading: "Postponement:",
      content:
        "Kindly note that letters of invitation will be exclusively dispatched via postal mail to registered participants. We regret to inform you that we are unable to accommodate requests for invitation letters through alternative methods.",
    },
    {
      subHeading: "Registration Transfer:",
      content:
        "Fully paid registrations can be transferred to another individual from the same organization if the initially registered person is unable to attend. To facilitate this transfer, the registered person must email us at info@annexglobalconferences.com, providing the replacement person’s full name, title, contact phone number, and email address. All other registration details will be assigned to the new person unless specified otherwise. Transfers from one conference to another are permissible unless notified within 14 days of the respective conference. However, transferred registrations are not eligible for a refund.",
    },
    {
      subHeading: "Refund Policy: :",
      content:
        "If you are unable to attend and cannot transfer your registration, the following refund policy applies:",
    },
    {
      content:
        "Before 50 days of the conference: Eligible for a 50% payment refund, minus a 20% service fee\nBefore 30 days of the conference: Not eligible for a refund\nE-Poster payments are non-refundable",
    },
    {
      content:
        "(The process of refund and credit the amount to the bank account will be refunded within 7-9 working days)",
    },
    {
      subHeading: "VISA Information:",
      content:
        "It is recommended to apply for a VISA as early as possible due to heightened security measures. ANNEX GLOBAL conferences group will not liaise with embassies and consulates on your behalf. Business VISA applications are advised. Please note that VISA issues are not covered by our cancellation policy, including VISA application failures.",
    },
    {
      subHeading: "Accommodation Cancellation Policy:",
      content:
        "Hotels enforce their own cancellation policies, typically applicable for cancellations made less than 30 days before arrival. Contact us promptly for any accommodation booking changes or cancellations. We will provide information on your accommodation provider’s cancellation policy, ensuring understanding of any non-refundable deposits.",
    },
    {
  
      content:
        "For cancellation, postponement, or registration transfers, kindly reach out to us in writing at info@annexglobalconferences.com. Visa issues are not covered, and refund eligibility depends on the timing of your request. Hotel cancellation policies apply to accommodation bookings.",
    },
  ];

  return (
    <div className="container p-3 p-md-5">
      <h3 className="text-start fw-bold">Cancellation, Postponement, and Registration Transfer Guidelines</h3>
      <div className="mt-4">
        <p className={styles["about-content"]}>
          If you wish to cancel, postpone, or transfer your registration for any
          of our events, please adhere to the following instructions:
        </p>

        {/*  Mapping through termsData array */}
        {termsData.map((item, index) => (
          <DynamicContent
            key={index}
            subHeading={item.subHeading}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditionsContent;

//  Reusable DynamicContent Component
const DynamicContent = ({ subHeading, content }) => (
  <div>
    {subHeading && <h6 className={styles["sub-heading"]}>{subHeading}</h6>}
    {content && (
      <p className={styles["about-content"]}>
        {content.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
    )}
  </div>
);
