import React, { Component } from 'react';
import './Login.css';
import BGimage from '../../img/bg-01.jpg'

class Login extends Component {
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

        if(registrationVisibility === "") {
            this.setState({
                registrationVisibility: "styleHidden",
                loginVisibility: "",
            })
        }
    };


    showRegistrationForm = () => {
        const {
            loginVisibility,
        } = this.state;

        if(loginVisibility === "") {
            this.setState({
                loginVisibility: "styleHidden",
                registrationVisibility: "",
            })
        }
    };

    render() {
        const {
            loginVisibility,
            registrationVisibility,
        } = this.state;

        return (
            <React.Fragment>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-category">
                            <div className="category-login" onClick={this.showLoginForm}>
                                Log in
                            </div>
                            <div className="category-register" onClick={this.showRegistrationForm}>
                                Register
                            </div>
                        </div>
                        <div className={`wrap-login100 ${loginVisibility}`}>
                            <form className="login100-form validate-form">
                                <span className="login100-form-logo">
						            <i className="zmdi zmdi-settings zmdi-hc-spin"></i>
					            </span>
                                <span className="login100-form-title p-b-34 p-t-27">
						            Log in
					            </span>
                                <div className="wrap-input100 validate-input" data-validate="Enter username">
                                    <input className="input100" type="text" name="username" placeholder="Username"/>
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input className="input100" type="password" name="pass" placeholder="Password"/>
                                </div>
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                                    <label className="label-checkbox100" htmlFor="ckb1">
                                        Remember me
                                    </label>
                                </div>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className={`wrap-register100 ${registrationVisibility}`}>
                            <form className="login100-form validate-form">
                                <span className="login100-form-logo">
						            <i className="zmdi zmdi-account-add"></i>
					            </span>
                                <span className="login100-form-title p-b-34 p-t-27">
                                    Registration
					            </span>
                                <div className="wrap-input100 validate-input" data-validate="Enter username">
                                    <input className="input100" type="text" name="username" placeholder="Username"/>
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Enter username">
                                    <input className="input100" type="email" name="email" placeholder="Email"/>
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input className="input100" type="password" name="pass" placeholder="Password"/>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;