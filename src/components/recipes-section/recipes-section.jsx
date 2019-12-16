import React, { Component } from "react";
import "./recipes-section.css";
import RecipeCard from "../recipe-card/recipe-card";
import Spinner from "../spinner/spinner";
import withContext from "../hoc-helpers/withContext";
import Pagination from "../pagination/pagination";
import RecipesFilter from "../recipes-filter/recipes-filter";

class RecipesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
        };
    }

    componentDidMount() {
        this.renderRecipes();
    }

    componentDidUpdate(prevProps) {
        const {
            page,
        } = this.props;

        if (page !== prevProps.page) {
            this.renderRecipes();
        }
    }

    renderRecipes = () => {
        const {
            getAllRecipes,
            page,
        } = this.props;

        getAllRecipes()
            .then((recipes) => {
                this.setState({
                    recipes,
                });
            });

        // const necessaryRecipesIndexes = page * 12;
        // const necessaryRecipesStartIndex = necessaryRecipesIndexes - 12;
        // const necessaryRecipesArray = [];
        // for (let i = 0; i < 12; i++) {
        //     const currentIndex = necessaryRecipesStartIndex + i;
        //     if (!recipes[currentIndex]) break;
        //     necessaryRecipesArray.push(recipes[currentIndex]);
        // }
    };

    render() {
        const {
            recipes,
        } = this.state;

        const {
            onPageChange,
        } = this.props;

        if (recipes === null) return <Spinner />;

        return (
            <div className="recipes-section">
                <RecipesFilter />
                <div className="container">
                    <h2 className="recipes-section__title">Рецепты</h2>
                    <div className="row">
                        {recipes.map((item) => {
                            const { _id, name, description } = item;
                            return (
                                <RecipeCard
                                    key={_id}
                                    id={_id}
                                    name={name}
                                    description={description}
                                />
                            );
                        })}
                    </div>
                    <Pagination
                        onPageChange={(page) => onPageChange(page)}
                    />
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (RecipesAPI) => ({
    getAllRecipes: RecipesAPI.getAllRecipes,
});

export default withContext(mapMethodsToProps)(RecipesSection);
