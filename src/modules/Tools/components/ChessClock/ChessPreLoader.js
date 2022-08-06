import React from 'react'
import { RowPreloader } from "components/preloders";
const ChessPreLoader=()=>{
  return (
    <div>
    <RowPreloader />
    <div className={"normal-chess-screen"}>
      <div style={{ margin: "10% 22%" }}>
        <RowPreloader height="50vh" />
      </div>
    </div>
  </div>
  )

}

export default ChessPreLoader