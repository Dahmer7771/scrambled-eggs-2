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
            name,
            description,
            image,
            id,
        } = this.props;

        let imageUrl = image;

        if (image) {
            imageUrl = image.replace(/(.*)(uploads)\/(.*)$/, "./$2/$3");
        } else {
            imageUrl = "./uploads/notaviable.jpg";
        }

        return (
            <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
                <div className="card recipe-card">
                    <div className="carg-image">
                        <img src={imageUrl} alt="q" className="recipe-image" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <div className="module">
                            <p className="card-text line-clamp">
                                {description}
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
        );
    }
}

export default RecipeCard;
