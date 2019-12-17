import React, { Component } from "react";
import "./management.css";
import EditorConvertToHTML from "../editor-convert-to-html/editor-convert-to-html";

class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <EditorConvertToHTML />
            </div>
        );
    }
}

export default Management;
