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
            currentPage,
        } = this.props;

        if (currentPage !== prevProps.currentPage) {
            this.renderRecipes();
        }
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    renderRecipes = () => {
        const {
            getAllRecipes,
            getRecipesWithSkip,
            currentPage,
            recipesPerPage,
            // match
        } = this.props;

        this.isMount = true;

        // const skippedRecipesCount = (currentPage - 1) * recipesPerPage;

        getAllRecipes()
            .then((recipes) => this.isMount && this.setState({ recipes }));

        // getRecipesWithSkip(skippedRecipesCount, recipesPerPage)
        //     .then((recipes) => this.isMount && this.setState({ recipes }));
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
            recipesPerPage,
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
                    {/* <Pagination */}
                    {/*    recipesPerPage={recipesPerPage} */}
                    {/*    onPageChange={(page) => onPageChange(page)} */}
                    {/* /> */}
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (RecipesAPI) => ({
    getAllRecipes: RecipesAPI.getAllRecipes,
    getSortedRecipes: RecipesAPI.getSortedRecipes,
    getRecipesWithSkip: RecipesAPI.getRecipesWithSkip,
});

export default withContext(mapMethodsToProps)(RecipesSection);
