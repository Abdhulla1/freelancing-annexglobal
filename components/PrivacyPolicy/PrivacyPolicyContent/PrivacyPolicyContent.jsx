import React from "react";
import styles from "./PrivacyPolicyContent.module.css";

const PrivacyPolicy = () => {
  //  Store subheadings and content as an array
  const termsData = [
    {
      subHeading: "Annex Globaltech",
      content:
        "manages the annexglobalconferences.com website, providing conference-related services. This document serves as a detailed guide, explaining our policies regarding the collection, use, and disclosure of Personal Information when individuals choose to use our services.",
    },
    {
      
      content:
        "By opting for our services, you implicitly agree to the collection and use of information as outlined in this policy. The Personal Information we collect is crucial for delivering and improving our services. Rest assured, your information will not be exploited or shared with any entity unless explicitly stated in this Privacy Policy.",
    },
    {
      
      content:
        "The terminology used here follows the definitions in our Terms and Conditions, accessible at unless explicitly redefined in this Privacy Policy.",
    },
    {
      subHeading: "Information Collection and Use:",
      content:
        "To enhance your experience with our services, we may require the submission of specific personally identifiable information, including your name, contact number, and postal address. This data will be judiciously used for communication and identification purposes.",
    },
    {
      subHeading: "Log Data:",
      content:
        "Each visit to our service results in the accumulation of Log Data, containing details such as your computer’s IP address, browser version, web pages viewed, visit history, duration of engagement, and various statistical insights.",
    },
    {
      subHeading: "Cookies:",
      content:
        "We use cookies, small data files with an anonymous unique identifier, to enhance your interaction with our service. These cookies are sent to your browser from the visited website and stored in your computer’s hard drive. The use of these “cookies” serves to gather information and improve the quality of our service. You have the option to accept or decline these cookies and can also discern when a cookie is sent to your device. Rejecting our cookies may limit your access to certain parts of our service.",
    },
    {
      subHeading: "Registration Transfer:",
      content:
        "Fully paid registrations can be transferred to another individual from the same organization if the initially registered person is unable to attend. To facilitate this transfer, the registered person must email us at info@annexglobalconferences.com, providing the replacement person’s full name, title, contact phone number, and email address. All other registration details will be assigned to the new person unless specified otherwise. Transfers from one conference to another are permissible unless notified within 14 days of the respective conference. However, transferred registrations are not eligible for a refund.",
    },
    {
      subHeading: "Service Providers:",
      content:
        " In our pursuit of service excellence, we may engage third-party entities and individuals to facilitate the seamless functioning of our service, act as surrogates for service provision, perform tasks related to our core offerings, and assist in analyzing how our service is utilized. It’s crucial to understand that these third parties have access to your Personal Information but are restricted to tasks delegated to them on our behalf. They are explicitly prohibited from disclosing or using this information for purposes other than those outlined herein.",
    },
    {
      subHeading: "Security:",
      content:
        "We value the trust you place in us when providing your Personal Information. We are committed to implementing commercially viable safeguards to protect this information. However, it’s essential to acknowledge that no method of information transmission over the Internet or electronic storage can claim 100% infallibility. Therefore, we cannot provide an absolute assurance of its inviolable security.",
    },
    {
      subHeading: "Links to Other Sites:",
      content:
        "Our service may contain links to external websites. Clicking on these links redirects you to third-party sites, not under our control. It’s imperative to review the Privacy Policy of these external domains as we have no jurisdiction or responsibility for their content, privacy protocols, or operational methods.",
    },
    {
      subHeading: "Children’s Privacy:",
      content:
      "Our services are not designed for individuals under 18, and we do not knowingly collect personally identifiable information from minors under 18. If such information is inadvertently received, we promptly delete it from our servers. Parents or legal guardians noticing a minor under 18 providing personal information should contact us for necessary actions.",
    },
    {
      subHeading: "Changes to this Privacy Policy:",
      content:
        "We reserve the right to periodically revise our Privacy Policy, and we recommend checking this page regularly for any updates. Changes will be effective immediately upon publication on this page.",
    },
    {
      subHeading: "Contact Us:",
      content:
        "For any questions or suggestions regarding our Privacy Policy, please reach out to us at info@annexglobalconferences.com. Your feedback and concerns are important to us, and we welcome the opportunity to address them comprehensively. Feel free to contact us at info@annexglobalconferences.com.",
    },
    
  ];

  return (
    <div className="container p-3 p-md-5">
      {/* <h3 className="text-start fw-bold">Cancellation, Postponement, and Registration Transfer Guidelines</h3> */}
      <div className="mt-4">
        {/* <p className={styles["about-content"]}>
          If you wish to cancel, postpone, or transfer your registration for any
          of our events, please adhere to the following instructions:
        </p> */}

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

export default PrivacyPolicy;

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
