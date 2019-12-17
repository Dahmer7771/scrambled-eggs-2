import React, { Component } from "react";
import "./recipes-section.css";
import RecipeCard from "../recipe-card/recipe-card";
import Spinner from "../spinner/spinner";
import withContext from "../hoc-helpers/withContext";
import Pagination from "../pagination/pagination";
import RecipesFilter from "../recipes-filter/recipes-filter";
import Warning from "../warning/warning";

class RecipesSection extends Component {
    constructor(props) {
        super(props);
        this.isMount = false;
        this.state = {
            recipes: null,
        };
    }

    componentDidMount() {
        this.renderRecipes();
    }

    componentDidUpdate(prevProps) {
        const {
            page,
        } = this.props;

        if (page !== prevProps.page) {
            this.renderRecipes();
        }
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    renderRecipes = () => {
        const {
            getAllRecipes,
            // page,
        } = this.props;

        this.isMount = true;
        getAllRecipes()
            .then((recipes) => this.isMount && this.setState({ recipes }));

        // const necessaryRecipesIndexes = page * 12;
        // const necessaryRecipesStartIndex = necessaryRecipesIndexes - 12;
        // const necessaryRecipesArray = [];
        // for (let i = 0; i < 12; i++) {
        //     const currentIndex = necessaryRecipesStartIndex + i;
        //     if (!recipes[currentIndex]) break;
        //     necessaryRecipesArray.push(recipes[currentIndex]);
        // }
    };

    onFilterChange = (field, order) => {
        const {
            getSortedRecipes,
        } = this.props;

        getSortedRecipes(field, order)
            .then((recipes) => {
                this.setState({
                    recipes,
                });
            });
    };

    search = (recipesList, term = "") => {
        if (term.length < 1) return recipesList;

        return recipesList.filter((item) => item.name.toLowerCase()
            .indexOf(term.toLowerCase()) > -1);
    };

    render() {
        const {
            recipes,
        } = this.state;

        const {
            onPageChange,
            searchText,
        } = this.props;

        if (recipes === null) return <Spinner />;

        const searchedRecipes = this.search(recipes, searchText);

        const warning = searchedRecipes.length ? null : <Warning label="No recipes found" />;

        return (
            <div className="recipes-section">
                <RecipesFilter onFilterChange={this.onFilterChange} />
                <div className="container">
                    <h2 className="recipes-section__title">Рецепты</h2>
                    <div className="row">
                        {warning}
                        {searchedRecipes.map((item) => {
                            const { _id, name, description } = item;
                            return (
                                <RecipeCard
                                    key={_id}
                                    id={_id}
                                    name={name}
                                    description={description}
                                />
                            );
                        })}
                    </div>
                    <Pagination
                        onPageChange={(page) => onPageChange(page)}
                    />
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (RecipesAPI) => ({
    getAllRecipes: RecipesAPI.getAllRecipes,
    getSortedRecipes: RecipesAPI.getSortedRecipes,
});

export default withContext(mapMethodsToProps)(RecipesSection);
