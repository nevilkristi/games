import React from "react";
import warningsvg from "assets/img/warning.svg";

const FingerChooser = () => {
  return (
    <div >
      <div className="desktop-view">
        <div
          className="breadcrumb-title white-text border-line pb-3"
          id="breadcrumb"
        >
          
          Finger Chooser
        </div>
      </div>
      <div className="finger-wrap">
        <div className="">
          <img src={warningsvg} alt="warning" className="mb-5" />
          <div className="finger-warning-text">
            Sorry! This tool does not support in desktop
          </div>
        </div>
      </div>
    </div>
  );
};

export default FingerChooser;
