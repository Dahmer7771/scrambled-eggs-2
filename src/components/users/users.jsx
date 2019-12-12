import React, { Component } from "react";


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {
            id,
            name,
        } = this.props;

        return (
            <div className="container">
                <table
                    className="table"
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col"><i className="material-icons">delete_forever</i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Name</td>
                            <td><i className="material-icons">delete_forever</i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Users;
