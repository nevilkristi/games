import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  const params = window.location.href;
  return (
    <>
      {!params.includes("wheel1") && <Header />}
      <div
        className={`main-section ${
          params.includes("wheel1") && "wheel-section"
        }`}
      >
        {children}
      </div>
      {!params.includes("wheel1") && <Footer />}
    </>
  );
};

export default Layout;
