import React, { Component } from "react";
import "./autorization.css";

class Autorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisibility: "",
            registrationVisibility: "styleHidden",
        };

        this.showLoginForm = this.showLoginForm.bind(this);
        this.showRegistrationForm = this.showRegistrationForm.bind(this);
    }

    showLoginForm = () => {
        const {
            registrationVisibility,
        } = this.state;

        if (registrationVisibility === "") {
            this.setState({
                registrationVisibility: "styleHidden",
                loginVisibility: "",
            });
        }
    };

    showRegistrationForm = () => {
        const {
            loginVisibility,
        } = this.state;

        if (loginVisibility === "") {
            this.setState({
                loginVisibility: "styleHidden",
                registrationVisibility: "",
            });
        }
    };

    render() {
        const {
            loginVisibility,
            registrationVisibility,
        } = this.state;
        return (
            <div className="container">
                <div className="autorization-container row">
                    <div className="btn-group autorization-buttons" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-light" onClick={this.showLoginForm}>Вход</button>
                        <button type="button" className="btn btn-light" onClick={this.showRegistrationForm}>Регистрация</button>
                    </div>
                    <form className={`login col-md-10 offset-md-1 ${loginVisibility}`}>
                        <div className="form-group row">
                            <label htmlFor="inputlogin3" className="col-sm-2 col-form-label">Login</label>
                            <div className="col-sm-10">
                                <input type="login" className="form-control" id="inputEmail3" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Sign in</button>
                            </div>
                        </div>
                    </form>

                    <form className={`registration col-md-10 offset-md-1 ${registrationVisibility}`}>
                        <div className="form-group row">
                            <label htmlFor="inputlogin3" className="col-sm-2 col-form-label">Login</label>
                            <div className="col-sm-10">
                                <input type="login" className="form-control" id="inputEmail3" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail3" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Registration</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default Autorization;
