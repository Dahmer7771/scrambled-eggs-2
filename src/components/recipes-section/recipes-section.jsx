import React, { Component } from "react";
import "./recipes-section.css";
import RecipeCard from "../recipe-card/recipe-card";
import testRecipes from "../../services/test-recipes";
import Spinner from "../spinner/spinner";

class RecipesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
        };
    }

    componentDidMount() {
        this.setState({
            recipes: testRecipes.all(),
        });
    }

    render() {
        const {
            recipes,
        } = this.state;

        if (recipes === null) return <Spinner />;

        return (
            <div className="recipes-section">
                <div className="container">
                    <h2 className="recipes-section__title">Рецепты</h2>
                    <div className="row">
                        {recipes.map((item) => {
                            return (
                                <RecipeCard key={item.id} {...item} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipesSection;
