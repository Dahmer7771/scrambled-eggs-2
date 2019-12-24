import React, { Component } from "react";
import withContext from "../hoc-helpers/with-сontext";
import RecipeCard from "../recipe-card/recipe-card";
import Spinner from "../spinner/spinner";

class SearchedRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            loading: false,
        };
    }

    componentDidUpdate(prevProps) {
        const {
            recipeIngredients,
        } = this.props;

        if (prevProps.recipeIngredients !== recipeIngredients) {
            this.updateSearchedRecipes();
        }
    }

    updateSearchedRecipes = () => {
        const {
            getRecipesByIngredients,
            recipeIngredients,
        } = this.props;

        this.setState({
            loading: true,
        });

        const ingredientsArray = recipeIngredients.map((item) => item.name);

        getRecipesByIngredients(ingredientsArray)
            .then((recipes) => {
                this.setState({
                    recipes,
                    loading: false,
                });
            });
    };

    render() {
        const {
            recipes,
            loading,
        } = this.state;

        if (loading) return <Spinner />;
        if (!recipes.length) return <h2 className="text-center">No recipes found</h2>;

        return (
            <div className="searched-recipes">
                <div className="row">
                    {recipes.map(({
                        _id,
                        name,
                        description,
                        image,
                    }) => (
                        <RecipeCard
                            key={_id}
                            id={_id}
                            name={name}
                            description={description}
                            image={image}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (RecipesAPI) => ({
    getRecipesByIngredients: RecipesAPI.getRecipesByIngredients,
});

export default withContext(mapMethodsToProps)(SearchedRecipes);
