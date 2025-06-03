import React from "react";
import WelcomeContentStyle from "./WelcomeContent.module.css";


const WelcomeContent = ({ conference }) => {
  return (
    <div className={"container mt-3 p-4 " + WelcomeContentStyle["container"]}>
      <h3 className="fw-bold text-center p-4">{conference?.title}</h3>
      <div className={WelcomeContentStyle["content-container"]}>
       <div 
       className="ql-editor"
       style={{ width: "100%", height: "100%", borderRadius: "20px", overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: conference?.content }}
       />
      </div>
    </div>
  );
};

export default WelcomeContent;
