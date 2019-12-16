import React, { Component } from "react";
import "./management.css";

class Management extends Component {
    render() {
        return (
            <div className="container">
                <table className="table users-table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name_recipe</th>
                            <th scope="col">Date</th>
                            <th scope="col">Change/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">asd</th>
                            <td>adsfdasf</td>
                            <td>
                                <button type="submit" className="change_delete btn btn-light">
                                    <i className="material-icons">settings_applications</i>
                                </button>
                                <button type="submit" className="change_delete btn btn-light">
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

export default Management;
