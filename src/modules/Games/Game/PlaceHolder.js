import { RowPreloader } from "components/preloders";
import React, { useState, useEffect } from "react";
import DummyArray from "services/dummyArray";
import cardPlaceholder from "assets/img/placeholder-card.svg";

const arr = DummyArray(2);
const PlaceHolder = () => {
  const [dummyArray, setDummyArray] = useState([]);
  useEffect(() => {
    setDummyArray(arr);
  }, []);

  return (
    <>
      <div
        className="search-area-right-dashboard"
        style={{
          borderRadius: "5px",
          height: "100px",
          width: "100%",
          backgroundColor: "#EEE",
        }}
      ></div>

      <div
        className="game-main-card"
        style={{
          borderRadius: "5px",
          height: "70px",
          width: "100%",
          backgroundColor: "#EEE",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      ></div>
      <div style={{ width: "100%", margin: "0  auto" }}>
        <RowPreloader height="80px" />
      </div>

      <div style={{ width: "100%", margin: "0 auto" }}>
        {dummyArray.map((i) => (
          <img
            key={i}
            src={cardPlaceholder}
            alt="..."
            style={{
              width: "100%",
              borderRadius: "5  px",
              marginBottom: "15px",
            }}
          />
        ))}
      </div>

      <div style={{ width: "100%", margin: "0 auto" }}>
        {dummyArray.map((i) => (
          <RowPreloader key={i} />
        ))}
      </div>
      <div>
        <img
          className="cust-btn-flex"
          src={cardPlaceholder}
          alt="placeHolder"
          style={{ width: "10%", height: "50px" }}
        />
      </div>
    </>
  );
};

export default PlaceHolder;
