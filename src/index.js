import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/custom.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
// import axios from "axios";
import "./components/translate/i18n";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { I18nextProvider } from "react-i18next";
import language from "../src/config/language/config/configLanguage";

const root = ReactDOM.createRoot(document.getElementById("root"));

// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("token");

// console.log("Bearer " + localStorage.getItem("token"));

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={language}>
      <App />
    </I18nextProvider>
  </Provider>
);

// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
