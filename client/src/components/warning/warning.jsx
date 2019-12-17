import React from "react";
import "./warning.css";

const Warning = (props) => {
    const {
        label,
    } = props;

    return (
        <div
            className="warning"
        >
            <h4>
                {label}
            </h4>
        </div>
    );
};

export default Warning;
