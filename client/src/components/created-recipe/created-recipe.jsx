import React, { Component, createRef } from "react";
import "./created-recipe.css";
import EditorConvertToHTML from "../editor-convert-to-html/editor-convert-to-html";
import withContext from "../hoc-helpers/withContext";

class CreatedRecipe extends Component {
    constructor(props) {
        super(props);
        this.createRecipeForm = createRef();
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

    onSubmit = (event) => {
        event.preventDefault();
        const { postForm } = this.props;

        postForm("#recipe-form")
            .then((data) => console.log(data))
            .then(this.createRecipeForm.current.reset());
    };

    render() {
        const {
            ingredients,
        } = this.state;

        let ingredientsList = null;

        if (ingredients) {
            ingredientsList = (
                <ul className="recipe-list row">
                    {ingredients.split(",").map((item) => (
                        <li className="recipe-list-item" key={item}>
                            {item}
                            <button type="button" className="button-delete-ingredient material-icons md-18 btn btn-secondary btn-sm disabled">
                                    close
                            </button>
                        </li>
                    ))}
                </ul>
            );
        }

        return (
            <div className="container">
                <form ref={this.createRecipeForm} method="POST" className="created_recipe" id="recipe-form" onSubmit={this.onSubmit}>
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
                        <input type="file" name="image" className="form-control-file" id="recipe-file" />
                    </div>
                    <EditorConvertToHTML />
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

const mapMethodsToProps = (RecipesAPI) => ({
    postForm: RecipesAPI.postForm,
});

export default withContext(mapMethodsToProps)(CreatedRecipe);
