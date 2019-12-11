import React, { Component } from "react";
import "./recipes-section.css";
import RecipeCard from "../recipe-card/recipe-card";
import Spinner from "../spinner/spinner";
import withContext from "../hoc-helpers/withContext";
import Pagination from "../pagination/pagination";

class RecipesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
        };
    }

    componentDidMount() {
        const {
            getAll,
        } = this.props;

        this.setState({
            recipes: getAll(),
        });
    }

    render() {
        const {
            recipes,
        } = this.state;

        if (recipes === null) return <Spinner />;

        return (
            <div className="recipes-section">
                <div className="container">
                    <h2 className="recipes-section__title">Рецепты</h2>
                    <div className="row">
                        {recipes.map((item) => {
                            const { id, name, description } = item;
                            return (
                                <RecipeCard
                                    key={id}
                                    id={id}
                                    name={name}
                                    description={description}
                                />
                            );
                        })}
                    </div>
                    <Pagination />
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (recipesAPI) => ({
    getAll: recipesAPI.getAll,
});

export default withContext(mapMethodsToProps)(RecipesSection);
