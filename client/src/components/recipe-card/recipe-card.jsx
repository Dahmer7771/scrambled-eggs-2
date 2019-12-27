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

<<<<<<< HEAD
        console.log(image);
        if (image) {
            imageUrl = image.replace(/(.*)(uploads)\/(.*)$/, "./$2/$3");
=======
        if (image) {
            imageUrl = image.replace(/(.*)(uploads)\/(.*)$/, "./$2/$3");
        } else {
            imageUrl = "./uploads/notaviable.jpg";
>>>>>>> 6576b20a5890e6965a72cfcd3295245c0506a665
        }

        return (
            <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
                <div className="card recipe-card">
                    <div className="embed-responsive embed-responsive-16by9">
                        <img src={imageUrl} alt="q" className="recipe-image embed-responsive-item" />
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
