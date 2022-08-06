import React from "react";
import notFoundSvg from "assets/img/not_found_404.png";

function PageNotFound() {
  return (
    <div className="text-center page-not-found-div">
      <img className="pageNotFound" src={notFoundSvg} alt="" />
    </div>
  );
}

export default PageNotFound;
