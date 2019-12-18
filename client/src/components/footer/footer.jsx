import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <footer className="page-footer font-small unique-color-dark">

                <div className="bg-primary">
                    <div className="container">

                        <div className="row py-4 d-flex align-items-center">

                            <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                                <h6 className="mb-0">Свяжитесь с нами в социальных сетях!</h6>
                            </div>

                            <div className="col-md-6 col-lg-7 text-center text-md-right">

                                <a href="/" className="fb-ic">
                                    <i className="fab fa-facebook-f white-text mr-4"> </i>
                                </a>
                                <a href="/" className="tw-ic">
                                    <i className="fab fa-twitter white-text mr-4"> </i>
                                </a>
                                <a href="/" className="gplus-ic">
                                    <i className="fab fa-google-plus-g white-text mr-4"> </i>
                                </a>
                                <a href="/" className="li-ic">
                                    <i className="fab fa-linkedin-in white-text mr-4"> </i>
                                </a>
                                <a href="/" className="ins-ic">
                                    <i className="fab fa-instagram white-text"> </i>
                                </a>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="container text-center text-md-left mt-5">

                    <div className="row mt-3">

                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                            <h6 className="text-uppercase font-weight-bold">Название компании</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                            <p>
                                   Сделаем проект за неделю в течении трёх месяцев!
                                    Проект ІН64-8 группа 5.
                            </p>

                        </div>

                        <div className="social col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                            <h6 className="text-uppercase font-weight-bold">Полезные ссылки</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                            <br />
                            <a href="/" className="zmdi zmdi-vk zmdi-hc-2x" />
                            <a href="/" className="zmdi zmdi-twitter zmdi-hc-2x" />
                            <a href="/" className="zmdi zmdi-facebook zmdi-hc-2x" />
                            <a href="/" className="zmdi zmdi-instagram zmdi-hc-2x" />
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                            <h6 className="text-uppercase font-weight-bold">Контакты</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                            <p>
                                <i className="fas fa-home mr-3" />
                                {" "}
                                Lublinska 10, rooom 806
                            </p>
                            <p>
                                <i className="fas fa-envelope mr-3" />
                                {" "}
                                room806@gmail.com
                            </p>
                            <p>
                                <i className="fas fa-phone mr-3" />
                                {" "}
                                + 01 234 567 88
                            </p>
                            <p>
                                <i className="fas fa-print mr-3" />
                                {" "}
                                + 01 234 567 89
                            </p>

                        </div>

                    </div>

                </div>

                <div className="footer-copyright text-center py-3">
                    © 2018 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
                </div>

            </footer>
        );
    }
}

export default Footer;
