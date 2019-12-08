import React, { Component } from "react";
import "./recipes-item-section.css";
import recipesAPI from "../../recipesAPI/recipesAPI";
import Spinner from "../spinner/spinner";
import RecipeInfo from "../recipe-info/recipe-info";

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
        } = this.props;

        setTimeout(
            () => {
                this.setState({
                    recipe: recipesAPI.get(
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

export default RecipesItemSection;
