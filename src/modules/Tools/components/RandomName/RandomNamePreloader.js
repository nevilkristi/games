import { RowPreloader } from "components/preloders";
import React from "react";

const RandomNamePreloader = () => {
  return (
    <div>
      <div className="desktop-view">
        <RowPreloader />
      </div>
      <div className="fullscreen-box">
        <div className="random-name white-text">
          <RowPreloader height="100px" />
          <div style={{ marginTop: "5px" }}>
            <RowPreloader height="260px" />
          </div>

          <div className="random-name-generator-btn" style={{width: "340px", margin: "0 auto", paddingTop:"10px"}}>
            <RowPreloader height="50px" />
          </div>
          <div style={{display:"flex", justifyContent:"center", paddingTop:"10px"}}>
            <div className="" style={{width:"16%"}}>
              <RowPreloader height="50px" />
            </div>
            <div className="ml-2" style={{width:"16%"}}>
              <RowPreloader height="50px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomNamePreloader;
