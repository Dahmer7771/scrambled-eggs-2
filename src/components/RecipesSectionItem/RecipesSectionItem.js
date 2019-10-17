import React, { Component } from 'react';
import './RecipesSectionItem.css';
import Dish from '../../img/dish.png'
import Like from '../../img/like.png'

class RecipesSectionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (
            <section className="recipes-section-item col-xl-5">
                <img className="recipe-image" src={Dish} alt="qwe" />
                <figcaption >
                    <div className="recipe-title">Классический крабовый салат с огурцом и мидиями</div>
                    <div className="recipe-description">
                        Здесь описывается рецепт...Здесь описывается рецепт...Здесь описывается рецепт...
                    </div>
                </figcaption>
                <div className="like">
                    <img src={Like} alt=""/>
                </div>
            </section>
        );
    }
}
 
export default RecipesSectionItem;