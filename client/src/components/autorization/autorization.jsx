import React, { Component } from "react";
import "./autorization.css";
import Zoom from "react-reveal/Zoom";
import { withCookies } from "react-cookie";
import formValidation from "../../helpers/autorizationValidation";
import withContext from "../hoc-helpers/with-сontext";

class Autorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisibility: "",
            registrationVisibility: "styleHidden",

            isLoginActive: true,
            isRegistrationActive: false,

            error: false,

            inputValues: {
                emailLogin: "",
                passwordLogin: "",
                firstnameRegistration: "",
                lastnameRegistration: "",
                emailRegistration: "",
                passwordRegistration: "",
                passwordConfirmRegistration: "",
            },

            errorMessage: {
                emailLogin: "",
                passwordLogin: "",
                firstnameRegistration: "",
                lastnameRegistration: "",
                emailRegistration: "",
                passwordRegistration: "",
                passwordConfirmRegistration: "",
            },

            errorVisibility: {
                emailLogin: {
                    visibility: "hidden",
                },
                passwordLogin: {
                    visibility: "hidden",
                },
                firstnameRegistration: {
                    visibility: "hidden",
                },
                lastnameRegistration: {
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
                emailLogin: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
                passwordLogin: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
                firstnameRegistration: {
                    borderBottom: "2px solid rgba(255,255,255,0.24)",
                },
                lastnameRegistration: {
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
            id,
            value,
        } = e.target;
        const {
            errorMessage,
            errorBorder,
            errorVisibility,
            inputValues,
        } = this.state;

        const isValid = formValidation(id, value);

        if (isValid.status === "success") {
            if (id === "passwordConfirmRegistration" && value !== inputValues.passwordRegistration) {
                this.setState({
                    error: true,
                    inputValues: {
                        ...inputValues,
                        [id]: value,
                    },
                    errorMessage: {
                        ...errorMessage,
                        [id]: "passwords does not match",
                    },
                    errorVisibility: {
                        ...errorVisibility,
                        [id]: {
                            visibility: "visible",
                        },
                    },
                    errorBorder: {
                        ...errorBorder,
                        [id]: {
                            borderBottom: "2px solid red",
                        },
                    },
                });
            }
            this.setState({
                error: false,
                inputValues: {
                    ...inputValues,
                    [id]: value,
                },
                errorMessage: {
                    ...errorMessage,
                    [id]: "",
                },
                errorVisibility: {
                    ...errorVisibility,
                    [id]: {
                        visibility: "hidden",
                    },
                },
                errorBorder: {
                    ...errorBorder,
                    [id]: {
                        borderBottom: "2px solid rgba(255,255,255,0.24)",
                    },
                },
            });
        } else {
            this.setState({
                error: true,
                inputValues: {
                    ...inputValues,
                    [id]: value,
                },
                errorMessage: {
                    ...errorMessage,
                    [id]: isValid.error,
                },
                errorVisibility: {
                    ...errorVisibility,
                    [id]: {
                        visibility: "visible",
                    },
                },
                errorBorder: {
                    ...errorBorder,
                    [id]: {
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

    onLoginSubmit = (e) => {
        e.preventDefault();
        const {
            error,
            inputValues,
        } = this.state;

        const {
            logIn,
            cookies,
        } = this.props;

        if (error) return;

        const email = inputValues.emailLogin.toLowerCase();
        const password = inputValues.passwordLogin;

        const data = {
            email,
            password,
        };

        // console.log(data);

        logIn(data)
            .then((res) => {
                // cookies.set("w_auth", res.w_auth, { path: "/" });
                cookies.set("w_auth", res.w_auth, { path: "/" });
                console.log(cookies.get("w_auth"));
            })
            .catch((errorMessage) => console.log(errorMessage));
    };

    onRegistrationSubmit = (e) => {
        const {
            error,
            inputValues,
        } = this.state;

        const {
            toRegister,
        } = this.props;

        if (error) e.preventDefault();

        const email = inputValues.emailRegistration.toLowerCase();
        const password = inputValues.passwordRegistration;
        const name = inputValues.firstnameRegistration;
        const lastname = inputValues.lastnameRegistration;

        const data = {
            email,
            password,
            name,
            lastname,
        };

        toRegister(data)
            .then((message) => console.log(message))
            .catch((errorMessage) => console.log(errorMessage));
    };

    // onInputUpdate = (e) => {
    //
    // };

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
                        <form id="login-form" onSubmit={this.onLoginSubmit} className={`login col-sm-12 col-md-12 col-lg-12 col-xl-12 ${loginVisibility}`}>
                            <Zoom duraction={100}>
                                <div className="form-group row">
                                    <label htmlFor="inputEmailLogin" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Email</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="email" name="email" className="form-field form-control" id="emailLogin" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.emailLogin}>
                                            {errorMessage.emailLogin}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom delay={200}>
                                <div className="form-group row">
                                    <label htmlFor="inputPasswordLogin" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Пароль</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="password" name="password" className="form-field form-control" id="passwordLogin" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.passwordLogin}>
                                            {errorMessage.passwordLogin}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom delay={300}>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <button type="submit" className="btn btn-primary">Войти</button>
                                    </div>
                                </div>
                            </Zoom>
                        </form>
                        <form id="registration-form" onSubmit={this.onRegistrationSubmit} className={`registration col-sm-12 col-md-12 col-lg-12 col-xl-12 ${registrationVisibility}`}>
                            <Zoom>
                                <div className="form-group row">
                                    <label htmlFor="inputFirstnameRegistration" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Имя</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="login" name="name" className="form-field form-control" id="firstnameRegistration" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.firstnameRegistration}>
                                            {errorMessage.firstnameRegistration}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom>
                                <div className="form-group row">
                                    <label htmlFor="inputLastnameeRegistration" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Фамилия</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="login" name="lastname" className="form-field form-control" id="lastnameRegistration" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.lastnameRegistration}>
                                            {errorMessage.lastnameRegistration}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom delay={100}>
                                <div className="form-group row">
                                    <label htmlFor="inputEmailRegistration" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Email</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="email" name="email" className="form-field form-control" id="emailRegistration" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.emailRegistration}>
                                            {errorMessage.emailRegistration}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom delay={200}>
                                <div className="form-group row">
                                    <label htmlFor="inputPasswordRegistration" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Пароль</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="password" name="password" className="form-field form-control" id="passwordRegistration" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.passwordRegistration}>
                                            {errorMessage.passwordRegistration}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom delay={300}>
                                <div className="form-group row">
                                    <label htmlFor="inputPasswordConfirmRegistration" className="col-sm-2 col-md-3 col-lg-2 col-form-label">Подтвердите пароль</label>
                                    <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                                        <input type="password" name="passwordConfirm" className="form-field form-control" id="passwordConfirmRegistration" onChange={this.handleFormInput} />
                                    </div>
                                    <div className="col-sm-12 offset-lg-2 col-md-9 offset-md-3 col-lg-10 col-xl-10">
                                        <div className="error-message" style={errorVisibility.passwordConfirmRegistration}>
                                            {errorMessage.passwordConfirmRegistration}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom delay={400}>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <button type="submit" className="btn btn-primary">Зарегестрироваться</button>
                                    </div>
                                </div>
                            </Zoom>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (recipesAPI) => ({
    toRegister: recipesAPI.toRegister,
    logIn: recipesAPI.logIn,
});

export default withCookies(withContext(mapMethodsToProps)(Autorization));
