import React from "react";
import notfound from "assets/img/grow_game_no_data_found_logo.svg";

const NoDataFound = () => {
  return (
    <div className="not-found text-center">
      <img src={notfound} alt="" />
    </div>
  );
};

export default NoDataFound;
