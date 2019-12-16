import React, { Component } from "react";
import "./autorization.css";
import Zoom from "react-reveal/Zoom";
import formValidation from "../../helpers/validation";

class Autorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisibility: "",
            registrationVisibility: "styleHidden",

            isLoginActive: true,
            isRegistrationActive: false,

            inputValues: {
                usernameLogin: "",
                passwordLogin: "",
                usernameRegistration: "",
                emailRegistration: "",
                passwordRegistration: "",
                passwordConfirmRegistration: "",
            },

            errorMessage: {
                usernameLogin: "",
                passwordLogin: "",
                usernameRegistration: "",
                emailRegistration: "",
                passwordRegistration: "",
                passwordConfirmRegistration: "",
            },

            errorVisibility: {
                usernameLogin: {
                    visibility: "hidden",
                },
                passwordLogin: {
                    visibility: "hidden",
                },
                usernameRegistration: {
                    visibility: "hidden",
                },
                emailRegistration: {
                    visibility: "hidden",
                },
                passwordRegistration: {
                    visibility: "hidden",
                },
                passwordConfirmRegistration: {
                    visibility: "hidden",
                },
            },

            errorBorder: {
                usernameLogin: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
                passwordLogin: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
                usernameRegistration: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
                emailRegistration: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
                passwordRegistration: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
                passwordConfirmRegistration: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
            },
        };

        this.showLoginForm = this.showLoginForm.bind(this);
        this.showRegistrationForm = this.showRegistrationForm.bind(this);
    }

    handleFormInput = (e) => {
        const {
            name,
            value,
        } = e.target;
        const {
            errorMessage,
            errorBorder,
            errorVisibility,
            inputValues,
        } = this.state;

        const isValid = formValidation(name, value);

        if (isValid.status === "success") {
            if (name === "passwordConfirmRegistration" && value !== inputValues.passwordRegistration) {
                this.setState({
                    errorMessage: {
                        ...errorMessage,
                        [name]: "passwords does not match",
                    },
                    errorVisibility: {
                        ...errorVisibility,
                        [name]: {
                            visibility: "visible",
                        },
                    },
                    errorBorder: {
                        ...errorBorder,
                        [name]: {
                            borderBottom: "2px solid red",
                        },
                    },
                });
                return;
            }
            this.setState({
                inputValues: {
                    ...inputValues,
                    [name]: value,
                },
                errorMessage: {
                    ...errorMessage,
                    [name]: "",
                },
                errorVisibility: {
                    ...errorVisibility,
                    [name]: {
                        visibility: "hidden",
                    },
                },
                errorBorder: {
                    ...errorBorder,
                    [name]: {
                        borderBottom: "2px solid rgba(255,255,255,0.24)",
                    },
                },
            });
        } else {
            this.setState({
                errorMessage: {
                    ...errorMessage,
                    [name]: isValid.error,
                },
                errorVisibility: {
                    ...errorVisibility,
                    [name]: {
                        visibility: "visible",
                    },
                },
                errorBorder: {
                    ...errorBorder,
                    [name]: {
                        borderBottom: "2px solid red",
                    },
                },
            });
        }
    };

    showLoginForm = () => {
        const {
            registrationVisibility,
        } = this.state;

        if (registrationVisibility === "") {
            this.setState({
                registrationVisibility: "styleHidden",
                loginVisibility: "",
                isLoginActive: true,
                isRegistrationActive: false,
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
                isLoginActive: false,
                isRegistrationActive: true,
            });
        }
    };

    render() {
        const {
            loginVisibility,
            registrationVisibility,
            errorMessage,
            errorVisibility,
            isLoginActive,
            isRegistrationActive,
        } = this.state;

        const loginToggle = isLoginActive ? "btn-primary" : "btn-light";
        const registrationToggle = isRegistrationActive ? "btn-primary" : "btn-light";

        return (
            <div className="container">
                <div className="autorization-container row">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="btn-group autorization-buttons" role="group" aria-label="Basic example">
                            <button type="button" className={`btn ${loginToggle}`} onClick={this.showLoginForm}>Вход</button>
                            <button type="button" className={`btn ${registrationToggle}`} onClick={this.showRegistrationForm}>Регистрация</button>
                        </div>
                        <form className={`login col-sm-12 col-md-12 col-lg-12 col-xl-12 ${loginVisibility}`}>
                            <Zoom duraction={500}>
                                <div className="form-group row">
                                    <label htmlFor="inputLogin" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Login</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="login" name="usernameLogin" className="form-field form-control" id="inputLogin" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.usernameLogin}>
                                            {errorMessage.usernameLogin}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom delay={200}>
                                <div className="form-group row">
                                    <label htmlFor="inputPasswordLogin" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Password</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="password" name="passwordLogin" className="form-field form-control" id="inputPasswordLogin" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.passwordLogin}>
                                            {errorMessage.passwordLogin}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom delay={400}>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <button type="submit" className="btn btn-primary">Sign in</button>
                                    </div>
                                </div>
                            </Zoom>
                        </form>
                        <Zoom>
                            <form className={`registration col-sm-12 col-md-12 col-lg-12 col-xl-12 ${registrationVisibility}`}>
                                <Zoom>
                                    <div className="form-group row">
                                        <label htmlFor="inputRegistration" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Login</label>
                                        <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                            <input type="login" name="usernameRegistration" className="form-field form-control" id="inputRegistration" onChange={this.handleFormInput} />
                                        </div>
                                        <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                            <div className="error-message" style={errorVisibility.usernameRegistration}>
                                                {errorMessage.usernameRegistration}
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>
                                <Zoom delay={200}>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Email</label>
                                        <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                            <input type="email" name="emailRegistration" className="form-field form-control" id="inputEmail" onChange={this.handleFormInput} />
                                        </div>
                                        <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                            <div className="error-message" style={errorVisibility.emailRegistration}>
                                                {errorMessage.emailRegistration}
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>
                                <Zoom delay={300}>
                                    <div className="form-group row">
                                        <label htmlFor="inputPasswordRegistration" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Password</label>
                                        <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                            <input type="password" name="passwordRegistration" className="form-field form-control" id="inputPasswordRegistration" onChange={this.handleFormInput} />
                                        </div>
                                        <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                            <div className="error-message" style={errorVisibility.passwordRegistration}>
                                                {errorMessage.passwordRegistration}
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>
                                <Zoom delay={400}>
                                    <div className="form-group row">
                                        <label htmlFor="inputPasswordConfirmRegistration" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Confirm password</label>
                                        <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                            <input type="password" name="passwordRegistration" className="form-field form-control" id="inputPasswordConfirmRegistration" onChange={this.handleFormInput} />
                                        </div>
                                        <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                            <div className="error-message" style={errorVisibility.passwordConfirmRegistration}>
                                                {errorMessage.passwordConfirmRegistration}
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>
                                <Zoom delay={500}>
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <button type="submit" className="btn btn-primary">Sign up</button>
                                        </div>
                                    </div>
                                </Zoom>
                            </form>
                        </Zoom>
                    </div>
                </div>
            </div>
        );
    }
}

export default Autorization;
