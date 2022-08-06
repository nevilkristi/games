import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "iPhone" },
  { option: "Smart TV" },
  { option: "Car" },
  { option: "Hose" },
  { option: "Computer" },
  { option: "Travel" },
  { option: "Free Store" },
  { option: "Palabras cortas" },
  { option: "Sin premio" },
];

const NewWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor={["#f2f2f2"]}
        outerBorderWidth={[10]}
        innerBorderColor={["#f2f2f2"]}
        radiusLineColor={["#dedede"]}
        radiusLineWidth={[0]}
        fontSize={15}
        textColors={["#ffffff"]}
        backgroundColors={[
          "#F22B35",
          "#F99533",
          "#24CA69",
          "#514E50",
          "#46AEFF",
          "#9145B7",
        ]}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <div onClick={handleSpinClick} id="spin ">
        <b>SPIN</b>
      </div>
      {!mustSpin ? data[prizeNumber].option : "0"}
    </>
  );
};

export default NewWheel;
