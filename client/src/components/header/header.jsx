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
        return (
            <header className="header bg-primary">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <Link
                            to="/"
                            className="navbar-brand"
                        >
                            <span className="navbar-brand">
                                Scrambled Eggs
                            </span>
                        </Link>
                        <Search />
                        <NavMenu />
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
