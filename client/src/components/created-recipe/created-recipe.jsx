import React, { Component } from "react";
import "./created-recipe.css";
import EditorConvertToHTML from "../editor-convert-to-html/editor-convert-to-html";

class CreatedRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            ingredients: "",
        };
    }

    onIngredientAdd = () => {
        const {
            term,
            ingredients,
        } = this.state;

        if (!term) return;

        if (!ingredients) {
            const ingredientsItem = `${term}`;

            this.setState({
                ingredients: ingredientsItem,
            });
        } else {
            const ingredientsItem = `${ingredients},${term}`;

            this.setState({
                ingredients: ingredientsItem,
            });
        }
    };

    onIngredientInputChange = (e) => {
        const term = e.target.value;

        this.setState({
            term,
        });
    };

    render() {
        const {
            ingredients,
        } = this.state;

        let ingredientsList = null;

        if (ingredients) {
            ingredientsList = (
                <ul>
                    {
                        ingredients.split(",").map((item) => (
                            <li key={item}>
                                {item}
                            </li>
                        ))
                    }
                </ul>
            );
        }

        return (
            <div className="container">
                <form className="created_recipe">
                    <div className="form-group">
                        <label htmlFor="recipe-name">Название рецепта:</label>
                        <input type="text" name="name" className="form-control" id="recipe-name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipe-description">Краткое описание:</label>
                        <textarea className="form-control" name="description" id="recipe-description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipe-category">Категория</label>
                        <select className="form-control" id="recipe-category" name="category">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <label htmlFor="recipe-ingredients">Ингредиенты:</label>
                    <div className="input-group">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button onClick={this.onIngredientAdd} className="btn btn-outline-secondary" type="button" id="button-addon1">
                                    Добавить
                                </button>
                            </div>
                            <input
                                onChange={this.onIngredientInputChange}
                                id="recipe-ingredients"
                                type="text"
                                className="form-control"
                                placeholder=""
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                            />
                        </div>
                        <input readOnly style={{ display: "none" }} value={ingredients} type="text" name="ingredient" className="form-control" />
                    </div>
                    {ingredientsList}
                    <div className="form-group">
                        <label htmlFor="recipe-file">Фото</label>
                        <input type="file" name="file" className="form-control-file" id="recipe-file" />
                    </div>
                    <EditorConvertToHTML />
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CreatedRecipe;
