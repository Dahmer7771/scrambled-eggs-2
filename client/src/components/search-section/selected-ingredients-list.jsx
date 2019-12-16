import React, { Component } from "react";

class SelectedIngredientsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            recipeIngredients,
        } = this.props;

        const listItems = recipeIngredients.map((item) => (
            <li key={recipeIngredients.indexOf(item)} className="list-group-item">
                <span className="list-item__label">
                    {item}
                </span>
                <button type="button" className="btn btn-danger">
                    Delete
                </button>
            </li>
        ));

        return (
            <div className="selected-ingredients-list">
                <ul className="list-group list-group-flush">
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default SelectedIngredientsList;
