import React, { Component } from "react";
import "./recipes-filter.css";

class RecipesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            onFilterChange,
        } = this.props;

        return (
            <div className="recipes-filter">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-body">
                        <a className="navbar-brand" href="c">Фильтр</a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarFilter"
                            aria-controls="navbarFilter"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarFilter">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="qwe"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Сортировка
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <span
                                            className="dropdown-item filter-item"
                                            onClick={() => onFilterChange("like", "desc")}
                                        >
                                            Популярные
                                        </span>
                                        <span
                                            className="dropdown-item filter-item"
                                            onClick={() => onFilterChange("created", "desc")}
                                        >
                                            Новые
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default RecipesFilter;
