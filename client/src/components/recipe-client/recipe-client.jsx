import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./recipe-client.css";
import withContext from "../hoc-helpers/with-сontext";

class RecipeClient extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div className="container">
                <table className="table user-recipe">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название рецепта</th>
                            <th scope="col">Дата</th>
                            <th scope="col" className="button-change-delete">Изменить/Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>без 5минут</td>
                            <td className="button-change-delete">
                                <Link to="/change">
                                    <button type="button" className="btn btn-secondary material-icons">
                                        settings_applications
                                    </button>
                                </Link>
                                <button type="button" className="btn btn-secondary material-icons">
                                        delete_forever
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapMethodsToProps = (recipesAPI) => ({
    getAllRecipes: recipesAPI.getAllRecipes,
});

export default withContext(mapMethodsToProps)(RecipeClient);
