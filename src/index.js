import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "assets/css/style.css";
import "assets/css/responsive.css";
import "assets/css/cust-slick.css";
import { PreloaderLogo } from "components/preloders";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<PreloaderLogo />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
