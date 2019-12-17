import React, { Component } from "react";

class Management extends Component {
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
                                <div className="btn-group btn-group-lg" role="group" aria-label="Button group with nested dropdown">
                                    <button type="button" className="btn btn-secondary material-icons">
                                        settings_applications
                                    </button>
                                    <button type="button" className="btn btn-secondary material-icons">
                                        delete_forever
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Management;
