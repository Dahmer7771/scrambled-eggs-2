import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min";
import { CookiesProvider } from "react-cookie";
import App from "./components/app/app";

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById("root"),
);
