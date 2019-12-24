import React, { Component } from "react";
import "./delete-recipe.css";
import withContext from "../hoc-helpers/with-сontext";

class DeleteRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allRecipes: null,
        };
    }

    componentDidMount() {
        const {
            getAllRecipes,
        } = this.props;

        getAllRecipes()
            .then((allRecipes) => this.setState({
                allRecipes,
            }))
            .catch((err) => console.log(err));
    }

    deleteRecipe = (id) => {
        const {
            getAllRecipes,
            deleteRecipe,
        } = this.props;

        deleteRecipe(id)
            .then((res) => console.log(res))
            .then(() => getAllRecipes()
                .then((allRecipes) => this.setState({
                    allRecipes,
                })))
            .catch((err) => console.log(err));
    };

    render() {
        const {
            allRecipes,
        } = this.state;

        const recipeTableRow = allRecipes ? (
            allRecipes.map((item, index) => {
                const creationDateRegExp = /([0-9][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])/g;
                const creationDate = item.created.match(creationDateRegExp).toString();
                return (
                    <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{creationDate}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => this.deleteRecipe(item._id)}
                                type="button"
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                );
            })
        ) : null;

        return (
            <div className="container">
                <table className="table table-delete-recipe my-3">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название рецепта</th>
                            <th scope="col">Дата создания</th>
                            <th scope="col">Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeTableRow}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapMethodsToProps = (recipesAPI) => ({
    getAllRecipes: recipesAPI.getAllRecipes,
    deleteRecipe: recipesAPI.deleteRecipe,
});

export default withContext(mapMethodsToProps)(DeleteRecipe);
