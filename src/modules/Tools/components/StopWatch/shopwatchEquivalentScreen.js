import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Projector = ({ children }) => {
  const el = document.createElement("div");
  const externalWindow = useRef(null);
  useEffect(() => {
    externalWindow.current = window.open(
      "",
      "",
      "width=600,height=400,left=200,top=200"
    );
    externalWindow.current.document.body.appendChild(el);
    return () => {
      externalWindow.current.close();
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};

export default Projector;
