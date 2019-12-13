import React, { Component } from "react";
import "./recipes-item-section.css";
import Spinner from "../spinner/spinner";
import RecipeInfo from "../recipe-info/recipe-info";
import withContext from "../hoc-helpers/withContext";

class RecipesItemSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
        };
    }

    componentDidMount() {
        const {
            match: {
                params,
            },
            getRecipeById,
        } = this.props;

        setTimeout(
            () => {
                getRecipeById(params.id)
                    .then((recipe) => {
                        this.setState({
                            recipe,
                        });
                    });
            },
            1000,
        );
    }

    render() {
        const { recipe } = this.state;

        if (recipe === undefined) {
            return (
                <div className="container" style={{ textAlign: "center", margin: "20px auto" }}>
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

export default withContext(mapMethodsToProps)(RecipesItemSection);
