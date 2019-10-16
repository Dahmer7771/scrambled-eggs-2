import React, { Component } from 'react';
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