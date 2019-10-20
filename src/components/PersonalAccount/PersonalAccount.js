import React from 'react';
import './PersonalAccount.css';
import Editor from 'draft-js-editor';
import { EditorState, convertFromRaw } from 'draft-js';
import TextEditor from '../TextEditor/TextEditor';

class PersonalAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }

    componentDidMount() {
        // eslint-disable-next-line no-undef
        var editor = new wysihtml5.Editor("wysihtml5-textarea", {
            toolbar: 'wysihtml5-toolbar',
            // eslint-disable-next-line no-undef
            parserRules: wysihtml5ParserRules,
        });
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    {/*{content}*/}
                </header>
                <main className="main-container">
                    <div className="container">
                        <div className="row">
                            <div className="menu col-md-3">
                                <nav>
                                    <ul>
                                        <li><a href="#">Пункт меню 1</a></li>
                                        <li><a href="#">Пункт меню 2</a></li>
                                        <li><a href="#">Пункт меню 3</a></li>
                                        <li><a href="#">Пункт меню 4</a></li>
                                        <li><a href="#">Пункт меню 5</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div
                                className="content col-md-9"
                                style={{height: "auto"}}
                            >
                                <label htmlFor="title">Заголовок</label>
                                <br/>
                                <input type="text" id="title" style={{width: "100%"}}/>
                                <br/><br/>
                                <label htmlFor="content">Текст</label>
                                <TextEditor/>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    {/*{content}*/}
                </footer>
            </React.Fragment>
        )
    }
}

export default PersonalAccount;