import React, { Component, createRef } from "react";
import "./recipe-info.css";

class RecipeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.stepsRef = createRef();
    }

    componentDidMount() {
        const {
            recipe: {
                steps,
            },
        } = this.props;

        if (this.stepsRef.current) {
            this.stepsRef.current.innerHTML = steps;
        }
    }

    render() {
        const {
            recipe: {
                name,
                description,
                category,
                created,
                ingredient,
                image,
            },
        } = this.props;

        let imageUrl = image;

        if (image) {
            imageUrl = image.replace(/(.*)(uploads)\\(.*)$/, "../$2/$3");
        }

        const creationDateRegExp = /([0-9][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])/g;
        const creationDate = created.match(creationDateRegExp).toString();
        const ingredients = ingredient.map((item) => (
            <li key={item} className="list-group-item">
                {item}
            </li>
        ));

        return (
            <div className="card recipes-item-section">
                <div className="row no-gutters">
                    <div className="col-md-4 col-sm-12 col-12">
                        <img src={imageUrl} alt="q" className="recipe-image" />
                        <h6 className="ingredients-title">
                            Ингредиенты:
                        </h6>
                        <ul className="list-group list-group-flush">
                            {ingredients}
                        </ul>
                    </div>

                    <div className="col-md-8 col-sm-12 col-12">
                        <div className="card-body">
                            <h4 className="card-title">
                                {name}
                            </h4>
                            <p className="card-text card-description">
                                {description}
                            </p>
                            <p className="card-text d-flex justify-content-between">
                                <small className="text-muted">
                                    {`Категория: ${category}`}
                                </small>
                                <small className="text-muted">
                                    {`Добавлено: ${creationDate}`}
                                </small>
                            </p>
                        </div>
                        <div className="card-body">
                            <h6 className="cooking-instruction__title">
                                Инструкция приготовления:
                            </h6>
                            <div ref={this.stepsRef} id="recipe-steps" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeInfo;
