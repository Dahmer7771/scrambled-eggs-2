import React, { Component } from "react";
import "./nav-menu.css";
import { Link } from "react-router-dom";

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link">
                                <Link to="/users">Users</Link>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                <Link to="/recipes/pages/1">Рецепты</Link>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                <Link to="/search">Поиск по ингредиентам</Link>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                <Link to="/autorization">Вход/Регистрация</Link>
                            </span>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

export default NavMenu;
