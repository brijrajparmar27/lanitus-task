import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import BoxProvider from "./box.context";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BoxProvider>
            <App />
        </BoxProvider>
    </React.StrictMode>
);
