import React, { Component } from "react";
import "./management.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: null,
        };
    }

    onEditorStateChange = (e) => {
        this.setState({
            editorState: e.value,
        });
    };

    render() {
        return (
            <div className="container">
                {/* <table className="table users-table"> */}
                {/*    <thead className="thead-light"> */}
                {/*        <tr> */}
                {/*            <th scope="col">Name_recipe</th> */}
                {/*            <th scope="col">Date</th> */}
                {/*            <th scope="col">Change/Delete</th> */}
                {/*        </tr> */}
                {/*    </thead> */}
                {/*    <tbody> */}
                {/*        <tr> */}
                {/*            <th scope="row">asd</th> */}
                {/*            <td>adsfdasf</td> */}
                {/*            <td> */}
                {/*                <button type="submit" className="change_delete btn btn-light"> */}
                {/*                    <i className="material-icons">settings_applications</i> */}
                {/*                </button> */}
                {/*                <button type="submit" className="change_delete btn btn-light"> */}
                {/*                    <i className="material-icons">delete_forever</i> */}
                {/*                </button> */}
                {/*            </td> */}
                {/*        </tr> */}
                {/*    </tbody> */}
                {/* </table> */}

                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}

export default Management;
