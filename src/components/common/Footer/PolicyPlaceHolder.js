import { RowPreloader } from "components/preloders";
import React from "react";

const PolicyPlaceHolder = () => {
  return (
    <>
      <div>
        <RowPreloader className="privacy-policy mb55 w100" height="180px" />
      </div>

      <div className=" container-fluid c-plr100 mt-5">
        <div className="w100 margin-zero-auto">
          <RowPreloader height="300px" />
        </div>
        <div className="w100 margin-zero-auto">
          <RowPreloader height="150px" />
        </div>{" "}
        <div className="w100 margin-zero-auto">
          <RowPreloader height="150px" />
        </div>{" "}
        <div className="w100 margin-zero-auto">
          <RowPreloader height="300px" />
        </div>
        <div className="w100 margin-zero-auto">
          <RowPreloader height="150px" />
        </div>{" "}
        <div className="w100 margin-zero-auto">
          <RowPreloader height="150px" />
        </div>{" "}
        <div className="w100 margin-zero-auto">
          <RowPreloader height="300px" />
        </div>
      </div>
    </>
  );
};

export default PolicyPlaceHolder;
