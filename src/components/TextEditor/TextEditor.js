import React from 'react';

class TextEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div id="wysihtml5-toolbar" style={{display: "none"}}>
                    <a data-wysihtml5-command="bold">bold </a>
                    <a data-wysihtml5-command="italic">italic </a>

                    <a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="red">red </a>
                    <a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="green">green </a>
                    <a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="blue">blue </a>

                    <a data-wysihtml5-command="createLink">insert link</a>
                    <div data-wysihtml5-dialog="createLink" style={{display: "none"}}>
                        <label>
                            Link:
                            <input data-wysihtml5-dialog-field="href" value="http://" className="text" />
                        </label>
                        <a data-wysihtml5-dialog-action="save">OK</a> <a data-wysihtml5-dialog-action="cancel">Cancel</a>
                    </div>
                </div>
                <form>
                    <textarea id="wysihtml5-textarea" placeholder="Enter your text ..." autoFocus />
                </form>
            </React.Fragment>
        );
    }
}

export default TextEditor;