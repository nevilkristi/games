import React from "react";
import LeftSideBar from "modules/Dashboard/components/LeftSideBar";
import IcebreakerComponent from "./components/IcebreakerComponent";

function IceBreaker() {
  return (
    <section className="grow-game bg-light-gray bg-shap">
      <div className="container-fluid c-plr100 ">
        <div className="cust-flex pt30">
          <div className="left-side-dashboard">
            <LeftSideBar type="IceBreaker" searchbar={false} />
          </div>
          <div className="right-side-dashboard">
            <IcebreakerComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
export default IceBreaker;
