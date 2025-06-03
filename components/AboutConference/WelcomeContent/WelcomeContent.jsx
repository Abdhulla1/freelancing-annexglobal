import React from "react";
import WelcomeContentStyle from "./WelcomeContent.module.css";

const WelcomeContent = ({ welcomeContent }) => {
  return (
    <div className={"container mt-3 p-4 "+WelcomeContentStyle['container']}>
      <h3 className="fw-bold text-center p-4">{welcomeContent?.title}</h3>
         <div
        className={`ql-editor ${WelcomeContentStyle["content-container"]}`}
        dangerouslySetInnerHTML={{ __html: welcomeContent?.content }}
      />
    </div>
  );
};

export default WelcomeContent;
