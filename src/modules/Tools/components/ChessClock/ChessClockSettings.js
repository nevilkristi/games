import React from "react";

const TimmerOptions = ({ isOption, defaultTime }) => {
  const handleClick = (id) => isOption(id);

  const options = [
    {
      title: "Active",
      time: 30,
    },
    {
      title: "Classical",
      time: 15,
    },
    {
      title: "Rapid",
      time: 10,
    },
    {
      title: "Blitz",
      time: 5,
    },
    {
      title: "Bullet",
      time: 3,
    },

    {
      title: "Lightning",
      time: 1,
    },
  ];

  return (
    <>
      <div className="user-chess-clock row">
        {options.map((option, index) => (
          <div
            className="col-md-6 col-lg-6 col-xl-4"
            onClick={() => handleClick(option.time)}
            key={index}
          >
            <div
              className={`user-mode-inner ${
                defaultTime === option.time ? "active" : ""
              }`}
            >
              <label className="costom-radio m-0 pointer">
                {option.title}
                <input
                  key={index}
                  type="radio"
                  checked={`${defaultTime === option.time ? "checked" : ""}`}
                  name="radio"
                  onChange={(e) => {}}
                />
                <span className="checkmark"></span>
              </label>
              <p key={index}>{option.time}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TimmerOptions;
