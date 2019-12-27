import React, { Component } from "react";
import "./recipes-filter.css";
import withContext from "../hoc-helpers/with-сontext";

class RecipesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
        };
    }

    componentDidMount() {
        const {
            getAllCategories,
        } = this.props;

        getAllCategories()
            .then((res) => {
                this.setState({
                    categories: res,
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const {
            categories,
        } = this.state;

        const {
            onFilterChange,
            onCategoryChange,
            showAllRecipes,
        } = this.props;

        let categoriesList;

        if (categories) {
            categoriesList = categories.map(({ _id, name }) => (
                <span
                    key={_id}
                    className="dropdown-item filter-item"
                    onClick={() => onCategoryChange(name)}
                >
                    {name}
                </span>
            ));
        }

        return (
            <div className="recipes-filter">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-body">
                        <h4 className="navbar-brand">Фильтр</h4>
                        <ul className="navbar-nav mr-auto filter-dropdown">
                            <li className="nav-item dropdown">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                        Сортировка
                                </span>
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
                            <li className="nav-item dropdown">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                        Категории
                                </span>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {categoriesList}
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <span className="nav-link cursor-pointer" onClick={showAllRecipes}>
                                    Все рецепты
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (RecipesAPI) => ({
    getAllCategories: RecipesAPI.getAllCategories,
});

export default withContext(mapMethodsToProps)(RecipesFilter);
