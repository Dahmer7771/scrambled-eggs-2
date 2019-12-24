import React, { Component } from "react";
import "./recipes-item-section.css";
import Spinner from "../spinner/spinner";
import RecipeInfo from "../recipe-info/recipe-info";
import withOntext from "../hoc-helpers/with-сontext";

class RecipesItemSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            error: null,
        };
    }

    componentDidMount() {
        const {
            match: {
                params,
            },
            getRecipeById,
        } = this.props;

        getRecipeById(params.id)
            .then((recipe) => {
                this.setState({
                    recipe,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                });
            });
    }

    render() {
        const {
            recipe,
            error,
        } = this.state;

        if (error) {
            return (
                <div className="container">
                    <h1>Recipe does not exist!</h1>
                </div>
            );
        }

        const spinner = recipe ? null : <Spinner />;
        const resipeItem = spinner ? null : <RecipeInfo recipe={recipe} />;

        return (
            <div className="container">
                {spinner}
                {resipeItem}
            </div>
        );
    }
}

const mapMethodsToProps = (recipesAPI) => ({
    getRecipeById: recipesAPI.getRecipeById,
});

export default withOntext(mapMethodsToProps)(RecipesItemSection);
