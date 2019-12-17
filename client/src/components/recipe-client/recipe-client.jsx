import React, { Component } from "react";
import { Link } from "react-router-dom";

class RecipeClient extends Component {
    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">First</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>
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

export default RecipeClient;
