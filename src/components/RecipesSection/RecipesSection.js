import React, { Component } from 'react';
import './RecipesSection.css';

import RecipesSectionItem from '../RecipesSectionItem/RecipesSectionItem';

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
                <div className="row justify-content-center">
                        <div className="recommended col-2">Рекомендуем</div>
                        <div className="new-recipes col-2">Новые рецепты</div>
                        <div className="popular col-2">Популярные</div>
                </div>
                <div className="row">
                    <RecipesSectionItem />
                    <RecipesSectionItem />
                    <RecipesSectionItem />
                    <RecipesSectionItem />
                </div>
            </section>
        );
    }
}
 
export default RecipesSection;