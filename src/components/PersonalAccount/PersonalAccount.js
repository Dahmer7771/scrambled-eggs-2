import React from 'react';
import './PersonalAccount.css';
import Editor from 'draft-js-editor';

class PersonalAccount extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <a href="#">header</a>
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
                                <Editor
                                    id="content"
                                    onChange={(editorState) => this.setState({ editorState })}
                                    editorState={this.state.editorState}
                                    style={{backgroundColor: 'white'}}
                                />
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <a href="#">footer</a>
                </footer>
            </React.Fragment>
        )
    }
}

export default PersonalAccount;