import React, { Component } from "react";
import "./recipe-card.css";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Lol from "./lol.jpg";

class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            name,
            description,
            id,
        } = this.props;

        const descriptionLabel = description[0];

        return (
            <Fade left cascade>
                <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
                    <div className="card recipe-card">
                        <div
                            className="recipe-image"
                            style={{
                                background: `url(${Lol})`,
                            }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <div className="module">
                                <p className="card-text line-clamp">
                                    {descriptionLabel}
                                </p>
                            </div>
                            <Link to={`/recipes/${id}`}>
                                <button type="button" className="btn btn-primary card-btn">
                                    Подробнее
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Fade>
        );
    }
}

export default RecipeCard;
