import React from "react";
import CounterStyle from "./Counter.module.css";
import Countup from "./Countup";

const Counter = () => {
  return (
    <div className={CounterStyle["counter-bg"]}>
      <h3 className="text-center m-0 text-white pt-3">Annual Statistics</h3>
      <div className="container">
        <div className="col-lg-8 col-md-12 mx-auto">
          <div className="mt-4 row ">
            <div className="col-3   d-flex justify-content-center align-items-center text-white">
              <div>
                <h3 className="fw-bold"><Countup value={500} /> +</h3>
                <p className="h5 fw-normal">Speakers</p>
              </div>
            </div>
            <div className="col-3   d-flex justify-content-center align-items-center text-white">
              <div>
                <h3 className="fw-bold"><Countup value={100} /> +</h3>
                <p className="h5 fw-normal">Events</p>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-center align-items-center text-white">
              <div>
                <h3 className="fw-bold"><Countup value={1000} /> +</h3>
                <p className="h5 fw-normal">Participants</p>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-center align-items-center text-white">
              <div>
                <h3 className="fw-bold"><Countup value={80} /> +</h3>
                <p className="h5 fw-normal">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
