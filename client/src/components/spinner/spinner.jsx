import React from "react";
import "./spinner.css";

const Spinner = () => (
    <div className="spinner-container">
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

export default Spinner;
