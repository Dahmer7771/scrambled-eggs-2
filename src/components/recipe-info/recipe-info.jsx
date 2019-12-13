import React, { Component } from "react";
import "./recipe-info.css";

class RecipeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            recipe: {
                _id,
                name,
                description,
                category,
            },
        } = this.props;

        const mainDescription = description[0];
        const cookingSteps = description.slice(1);

        return (
            <div className="card recipes-item-section">
                <div className="row no-gutters">
                    <div className="col-md-4 col-sm-12 col-12">
                        {/* Здесь будет картинка */}
                        <div className="recipe-image">
                            <div className="image-text">
                                {_id}
                            </div>
                        </div>
                        <h6 className="ingredients-title">
                            Ингредиенты:
                        </h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>

                    <div className="col-md-8 col-sm-12 col-12">
                        <div className="card-body">
                            <h4 className="card-title">
                                {name}
                            </h4>
                            <p className="card-text card-description">
                                {description[0]}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {`Категория: ${category}`}
                                </small>
                            </p>
                        </div>
                        <div className="card-body">
                            <h6 className="cooking-instruction__title">
                                Инструкция приготовления:
                            </h6>
                            {cookingSteps.map((step) => (
                                <p className="cooking-step">
                                    {step}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeInfo;
