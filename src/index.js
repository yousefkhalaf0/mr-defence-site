import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "./components/Store/Store"; 
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
            
        <App />
      
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
