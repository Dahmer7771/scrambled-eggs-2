import React, { Component } from "react";
import "./search-section.css";
import SearchInput from "./search-input";
import SelectedIngredientsList from "./selected-ingredients-list";
import SearchedRecipes from "./searched-recipes";

class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeIngredients: [],
        };
    }

    onRecipeIngredientAdd = (recipeIngredients) => {
        this.setState({
            recipeIngredients,
        });
    };

    render() {
        const {
            recipeIngredients,
        } = this.state;

        return (
            <div className="search-section">
                <div className="container">
                    <SearchInput
                        onRecipeIngredientAdd={this.onRecipeIngredientAdd}
                    />
                    <SearchedRecipes recipeIngredients={recipeIngredients} />
                </div>
            </div>
        );
    }
}

export default SearchSection;
