import React, { Component } from "react";
import "./editor-convert-to-html.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    componentDidMount() {
        const {
            steps,
        } = this.props;

        const html = steps || "<p>Опишите приготовление</p>";
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }

    componentDidUpdate(prevProps) {
        const {
            steps,
        } = this.props;

        if (prevProps.steps !== steps) {
            const html = steps || "<p>Опишите приготовление</p>";
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.onEditorStateChange(editorState);
            }
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;

        return (
            <>
                <div className="editor-convert-to-html">
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                <input
                    readOnly
                    style={{ width: "100%", display: "none" }}
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    type="text"
                    name="steps"
                    className="form-control"
                />
            </>
        );
    }
}

export default EditorConvertToHTML;
