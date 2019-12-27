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
                        <h4 className="navbar-brand">Фильтр</h4>
                        <ul className="navbar-nav mr-auto filter-dropdown">
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
                    </nav>
                </div>
            </div>
        );
    }
}

export default RecipesFilter;
