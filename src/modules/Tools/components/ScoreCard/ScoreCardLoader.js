import { RowPreloader } from "components/preloders";
import React from "react";

const ScoreCardLoader = () => {
  return (
    <div>
      <RowPreloader height="85px" />
      <div style={{ marginTop: "65px" }}>
        <RowPreloader height="350px" />
      </div>
    </div>
  );
};

export default ScoreCardLoader;
