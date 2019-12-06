import React, { Component } from "react";
import "./recipe-item.css";

class RecipeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            recipe,
        } = this.props;

        return (
            <div className="card recipes-item-section">
                <div className="row no-gutters">
                    <div className="col-md-4 col-12">
                        {/* Здесь будет картинка */}
                        <div className="recipe-image">
                            <div className="image-text">
                                {recipe.image}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 col-12">
                        <div className="card-body">
                            <h4 className="card-title">
                                {recipe.title}
                            </h4>
                            <p className="card-text">
                                This is a wider card with supporting text
                                below as a natural
                                lead-in to additional content. This content is
                                a little bit longer.
                                {recipe.description}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    Recipe ID:
                                    {recipe.id}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row no-gutters">
                    <div className="col-md-4 col-12 py-4">
                        <h6 className="ingredients-title">
                            Ingredients:
                        </h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                    <div className="cooking-instruction col-md-8 col-12">
                        <div className="card-body">
                            <h6 className="cooking-instruction__title">
                                Cooking instruction:
                            </h6>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Accusamus ad deserunt doloremque ea eum
                                expedita explicabo incidunt itaque labore,
                                laudantium non nostrum pariatur praesentium
                                qui quibusdam, rem unde vel voluptates?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeItem;
