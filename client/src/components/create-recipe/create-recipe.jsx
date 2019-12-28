import React, { Component, createRef } from "react";
import "./create-recipe.css";
import EditorConvertToHTML from "../editor-convert-to-html/editor-convert-to-html";
import withContext from "../hoc-helpers/with-сontext";
import ModalWindow from "../modal-window/modal-window";

class CreateRecipe extends Component {
    constructor(props) {
        super(props);
        this.createRecipeForm = createRef();
        this.state = {
            term: "",
            ingredients: "",
            categories: null,
            selectedRecipe: {
                id: "",
                name: "",
                description: "",
                steps: "",
                ingredient: [],
            },
            selectedIngredients: [],
            modalVisibility: true,
            modalHeader: "",
            modalMessage: "",
        };
    }

    componentDidMount() {
        const {
            selectedRecipe,
            getAllCategories,
        } = this.props;

        this.setState({
            selectedRecipe,
        });

        getAllCategories()
            .then((res) => {
                this.setState({
                    categories: res,
                });
            })
            .catch((err) => console.log(err));
    }

    componentDidUpdate(prevProps) {
        const {
            selectedRecipe,
        } = this.props;

        if (prevProps.selectedRecipe !== selectedRecipe) {
            let ingredientsArray;
            let ingredients;

            if (selectedRecipe.ingredient[0] === "") {
                ingredientsArray = [];
            } else {
                ingredientsArray = selectedRecipe.ingredient.map((item, index) => ({
                    id: index,
                    name: item,
                }));
                ingredients = selectedRecipe.ingredient.join(",");
            }

            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                ingredients,
                selectedRecipe,
                selectedIngredients: ingredientsArray,
            });
        }
    }

    onInputChange = (e) => {
        const {
            selectedRecipe,
        } = this.state;
        const inputName = e.target.name;
        const { value } = e.target;

        this.setState({
            selectedRecipe: {
                ...selectedRecipe,
                [inputName]: value,
            },
        });
    };

    onIngredientAdd = () => {
        const {
            term,
            ingredients,
            selectedIngredients,
        } = this.state;

        if (!term) return;

        let ingredientsToString;

        if (!ingredients) {
            ingredientsToString = `${term}`;
        } else {
            ingredientsToString = `${ingredients},${term}`;
        }

        this.setState({
            ingredients: ingredientsToString,
            selectedIngredients: this.addIngredient(selectedIngredients, term),
        });
    };

    onIngredientRemove = (id) => {
        const {
            selectedIngredients,
        } = this.state;

        const newIngredientsList = this.removeIngredient(selectedIngredients, id);
        const newIngredientsString = newIngredientsList.map((item) => item.name);

        this.setState({
            ingredients: newIngredientsString.join(","),
            selectedIngredients: this.removeIngredient(selectedIngredients, id),
        });
    };

    removeIngredient = (array, id) => {
        const arrayCopy = [...array];
        const itemIndex = arrayCopy
            .indexOf(arrayCopy.find((item) => item.id === id));
        arrayCopy.splice(itemIndex, 1);

        return [
            ...arrayCopy,
        ];
    };

    addIngredient = (array, name) => {
        const arrayCopy = [...array];
        let newId;

        if (arrayCopy.length > 0) {
            newId = arrayCopy[arrayCopy.length - 1].id + 1;
        } else {
            newId = 1;
        }

        const newIngredient = {
            id: newId,
            name,
        };

        arrayCopy.push(newIngredient);

        return [
            ...arrayCopy,
        ];
    };

    onIngredientInputChange = (e) => {
        const term = e.target.value;

        this.setState({
            term,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const {
            createRecipe,
            updateRecipe,
            isUpdate,
            selectedRecipe,
        } = this.props;

        const formSelector = "#recipe-form";

        if (isUpdate) {
            updateRecipe(formSelector, selectedRecipe._id)
                .then((data) => {
                    if (data.error) {
                        console.log(data);
                        this.setState({
                            modalHeader: "Ошибка ввода",
                            modalMessage: data.error.message,
                        });
                    } else {
                        this.setState({
                            modalHeader: "Рецепт обновлен",
                            modalMessage: "Вы успешно обновили рецепт",
                            selectedRecipe: {
                                id: "",
                                name: "",
                                description: "",
                                steps: "",
                                ingredient: [],
                            },
                        });
                    }
                })
                .then(this.createRecipeForm.current.reset())
                .catch((err) => console.log(err));
        } else {
            createRecipe(formSelector)
                .then((data) => {
                    if (data.error) {
                        this.setState({
                            modalHeader: "Ошибка ввода",
                            modalMessage: data.error.message,
                        });
                    } else {
                        this.setState({
                            modalHeader: "Рецепт добавлен",
                            modalMessage: "Вы успешно добавили рецепт",
                            selectedRecipe: {
                                id: "",
                                name: "",
                                description: "",
                                steps: "",
                                ingredient: [],
                            },
                        });
                    }
                })
                .then(this.createRecipeForm.current.reset())
                .catch((err) => console.log(err));
        }
    };

    render() {
        let {
            selectedRecipe,
        } = this.state;

        const {
            ingredients,
            categories,
            selectedIngredients,
            modalHeader,
            modalMessage,
            modalVisibility,
        } = this.state;

        let ingredientsList;

        if (selectedRecipe == null) {
            selectedRecipe = {
                id: "",
                name: "",
                description: "",
                steps: "",
                ingredient: [],
            };
        }
        // eslint-disable-next-line eqeqeq
        if (selectedIngredients.length > 0) {
            ingredientsList = (
                <ul className="recipe-list row">
                    {selectedIngredients.map((item) => (
                        <li className="recipe-list-item" key={item.id}>
                            {item.name}
                            <button onClick={() => this.onIngredientRemove(item.id)} type="button" className="button-delete-ingredient material-icons md-18 btn btn-light btn btn-sm disabled">
                                    close
                            </button>
                        </li>
                    ))}
                </ul>
            );
        }

        let categoriesList;

        if (categories) {
            categoriesList = categories.map(({ _id, name }) => (
                <option key={_id}>
                    {name}
                </option>
            ));
        }

        return (
            <div className="container">
                <h4 className="my-3">
                    <label htmlFor="searchInput">
                        Создание рецепта
                    </label>
                </h4>
                <form ref={this.createRecipeForm} method="POST" className="created_recipe" id="recipe-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="recipe-name">Название рецепта:</label>
                        <input onChange={this.onInputChange} value={selectedRecipe.name} type="text" name="name" className="form-control" id="recipe-name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipe-description">Краткое описание:</label>
                        <textarea onChange={this.onInputChange} value={selectedRecipe.description} className="form-control" name="description" id="recipe-description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipe-category">Категория</label>
                        <select className="form-control" id="recipe-category" name="category">
                            {categoriesList}
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
                                id="recipe-ingredient"
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
                    <EditorConvertToHTML steps={selectedRecipe.steps} />
                    <input
                        data-toggle="modal"
                        data-target="#exampleModal"
                        className="btn btn-primary"
                        type="submit"
                        value="Подтвердить"
                    />
                </form>
                <ModalWindow
                    visibility={modalVisibility}
                    header={modalHeader}
                    message={modalMessage}
                />
            </div>
        );
    }
}

const mapMethodsToProps = (RecipesAPI) => ({
    createRecipe: RecipesAPI.createRecipe,
    updateRecipe: RecipesAPI.updateRecipe,
    getAllCategories: RecipesAPI.getAllCategories,
});

export default withContext(mapMethodsToProps)(CreateRecipe);
