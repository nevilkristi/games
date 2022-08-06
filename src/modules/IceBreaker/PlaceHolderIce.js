import { RowPreloader } from "components/preloders";
import React from "react";

const PlaceHolderIce = () => {
  return (
    <>
      <div
        className="search-area-right-dashboard"
        style={{
          borderRadius: "5px",
          height: "10%",
          width: "100%",
          backgroundColor: "#EEE",
        }}
      ></div>

      <div style={{ width: "100%", marginTop: "25px" }}>
        <RowPreloader height="250px" />
      </div>
    </>
  );
};

export default PlaceHolderIce;
