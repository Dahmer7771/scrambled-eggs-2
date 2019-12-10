import React, { Component } from "react";
import "./recipes-item-section.css";
import testRecipes from "../../services/test-recipes";
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
            getById,
        } = this.props;

        setTimeout(
            () => {
                this.setState({
                    recipe: getById(
                        parseInt(params.id, 10),
                    ),
                });
            },
            1000,
        );
    }

    render() {
        const { recipe } = this.state;

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
    getById: recipesAPI.getById,
});

export default withContext(mapMethodsToProps)(RecipesItemSection);
