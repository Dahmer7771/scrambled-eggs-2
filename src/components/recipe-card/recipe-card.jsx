import React, { Component } from "react";
import "./recipe-card.css";
import { Link } from "react-router-dom";

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            itemId,
        } = this.props;

        return (
            <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
                <div className="card recipe-card">
                    <div className="recipe-image" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                            {`Some quick example text to build on the card title
                        and make up the bulk of the card's content.`}
                        </p>
                        <button type="button" className="btn btn-primary">
                            <Link to={`/recipes/${itemId}`}>Go somewhere</Link>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeCard;
