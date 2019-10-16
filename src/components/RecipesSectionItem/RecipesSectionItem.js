import React, { Component } from 'react';

class RecipesSectionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <section className="recipes-section-item col-xl-6">
                <img className="recipe-image" alt="qwe" />
                <figcaption>
                    <div className="recipe-title">Recipe Title</div>
                    <div className="recipe-labels">
                        <div className="recipe-labels-item">label 1</div>
                        <div className="recipe-labels-item">label 2</div>
                        <div className="recipe-labels-item">label 3</div>
                    </div>
                    <div className="recipe-description">
                        Здесь описывается рецепт... Оценки блюда не будет, ну ее нафиг
                    </div>
                </figcaption>
            </section>
        );
    }
}
 
export default RecipesSectionItem;