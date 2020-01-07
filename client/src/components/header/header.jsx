import React, { Component } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import NavMenu from "../nav-menu/nav-menu";
import Search from "../search/search";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            onSearchInputChange,
            isAuthorized,
            onAuthorizationSwitch,
        } = this.props;

        return (
            <header className="header bg-primary sticky-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <Link
                            to="/"
                            className="navbar-brand"
                        >
                            <img src="logo.png" alt="logo" className="header-logo" />
                            <span className="navbar-brand">
                                Scrambled Eggs
                            </span>
                        </Link>
                        <Search
                            onSearchInputChange={(searchText) => onSearchInputChange(searchText)}
                        />
                        <NavMenu
                            isAuthorized={isAuthorized}
                            onSearchInputChange={(searchText) => onSearchInputChange(searchText)}
                            onAuthorizationSwitch={(isAuth) => onAuthorizationSwitch(isAuth)}
                        />
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
