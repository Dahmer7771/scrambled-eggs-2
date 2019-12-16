import React, { Component } from "react";
import "./users.css";
import withContext from "../hoc-helpers/withContext";

class Users extends Component {
    render() {
        return (
            <div className="container">
                <table className="table users-table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Name</td>
                            <td>
                                <button type="submit" className="btn btn-light">
                                    <i className="material-icons">delete_forever</i>
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
    getAll: recipesAPI.getAll,
});

export default withContext(mapMethodsToProps)(Users);
