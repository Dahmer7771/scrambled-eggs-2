import React, { Component } from "react";

class SearchedRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="searched-recipes">
                <div className="card recipe-card">
                    <div className="row no-gutters">
                        <div className="col-md-4 col-12">
                            {/* Здесь будет картинка */}
                            <div className="recipe-image">
                                <div className="image-text">
                                    image
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 col-12">
                            <div className="card-body">
                                <h4 className="card-title">
                                    image
                                </h4>
                                <p className="card-text">
                                    This is a wider card with supporting text
                                    below as a natural
                                    lead-in to additional content. This content is
                                    a little bit longer.
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        Recipe ID:
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchedRecipes;
