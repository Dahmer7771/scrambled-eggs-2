import React, { Component } from 'react';
import './RecipesSection.css';

import RecipesSectionItem from '../RecipesSectionItem/RecipesSectionItem';
import RecipePage from "../RecipePage/RecipePage";

class RecipesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <section className="recipes-section container">
                <h3>Рецепты</h3>
                <div className="category">
                        <div className="recommended">Рекомендуем</div>
                        <div className="new-recipes">Новые рецепты</div>
                        <div className="popular">Популярные</div>
                </div>
                <div className="row justify-content-around no-gutters">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(recipe => {
                        return (
                            <RecipesSectionItem
                                id={recipe}
                                title={`recipe ${recipe}`}
                                description={`description ${recipe}`}
                                image={`image`}
                            />
                        )
                    })}
                </div>
            </section>
        );
    }
}
 
export default RecipesSection;