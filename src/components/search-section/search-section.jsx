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

    onRecipeIngredientAdd = (item) => {
        const newItem = item;

        this.setState(({ recipeIngredients }) => {
            const newArray = [
                ...recipeIngredients,
                newItem,
            ];

            return {
                recipeIngredients: newArray,
            };
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
                    <SelectedIngredientsList
                        recipeIngredients={recipeIngredients}
                    />
                    <SearchedRecipes />
                </div>
            </div>
        );
    }
}

export default SearchSection;
