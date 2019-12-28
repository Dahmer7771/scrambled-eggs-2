import React, { Component } from "react";
import "./recipes-section.css";
import RecipeCard from "../recipe-card/recipe-card";
import Spinner from "../spinner/spinner";
import withOntext from "../hoc-helpers/with-сontext";
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
        this.showAllRecipes();
    }

    componentDidUpdate(prevProps) {
        const {
            currentPage,
        } = this.props;

        if (currentPage !== prevProps.currentPage) {
            this.showAllRecipes();
        }
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    showAllRecipes = () => {
        const {
            getAllRecipes,
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

    onCategoryChange = (category) => {
        const {
            getRecipesByCategory,
        } = this.props;

        const data = {
            category,
        };
        getRecipesByCategory(data)
            .then((recipes) => this.setState({
                recipes,
            }))
            .catch((err) => console.log(err));
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
            searchText,
        } = this.props;

        if (recipes === null) return <Spinner />;

        const searchedRecipes = this.search(recipes, searchText);

        const warning = searchedRecipes.length ? null : <Warning label="Рецепты не найдены" />;

        return (
            <div className="recipes-section">
                <RecipesFilter
                    onFilterChange={this.onFilterChange}
                    onCategoryChange={this.onCategoryChange}
                    showAllRecipes={this.showAllRecipes}
                />
                <div className="container">
                    <h2 className="recipes-section__title">Рецепты</h2>
                    <div className="row">
                        {warning}
                        {searchedRecipes.map((item) => {
                            const {
                                _id, name, description, image,
                            } = item;
                            return (
                                <RecipeCard
                                    key={_id}
                                    id={_id}
                                    name={name}
                                    description={description}
                                    image={image}
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
    getRecipesByCategory: RecipesAPI.getRecipesByCategory,
});

export default withOntext(mapMethodsToProps)(RecipesSection);
