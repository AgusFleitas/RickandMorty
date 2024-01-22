import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import store from "./redux/store/store";
import App from "./App";
import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:3001';

axios.defaults.baseURL = 'https://rickandmorty-back-production-481c.up.railway.app/';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
