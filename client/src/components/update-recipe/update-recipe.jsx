import React, { Component } from "react";
import Select from "react-dropdown-select";
import CreatedRecipe from "../created-recipe/created-recipe";
import withContext from "../hoc-helpers/with-сontext";

class UpdateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: null,
            selectedRecipe: null,
        };
        this.cancelled = false;
    }

    componentDidMount() {
        const {
            getAllRecipes,
        } = this.props;

        getAllRecipes()
            .then((res) => !this.cancelled && this.setState({
                options: res,
            }))
            .catch((err) => console.log(err));
    }

    componentWillUnmount() {
        this.cancelled = true;
    }

    onSelectRecipe = (id) => {
        const {
            getRecipeById,
        } = this.props;

        getRecipeById(id)
            .then((res) => {
                this.setState({
                    selectedRecipe: res,
                });
            })
            .catch((err) => console.log(err));
    };

    render() {
        const {
            options,
            selectedRecipe,
        } = this.state;

        return (
            <>
                <div className="container">
                    <div className="search-input">
                        <h4 className="my-3">
                            <label htmlFor="searchInput">
                                Enter recipe ingredient
                            </label>
                        </h4>
                        <form
                            className="search-input"
                        >
                            <div className="input-group mb-3">
                                <Select
                                    options={options}
                                    valueField="_id"
                                    onChange={(value) => {
                                        // eslint-disable-next-line no-underscore-dangle
                                        const selectedItemId = value[0]._id;
                                        console.log("item Id:", selectedItemId);
                                        this.onSelectRecipe(selectedItemId);
                                    }}
                                    searchable
                                    labelField="name"
                                    searchBy="name"
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="submit"
                                        id="button-addon2"
                                    >
                                        Select
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <CreatedRecipe selectedRecipe={selectedRecipe} />
            </>
        );
    }
}

const mapMethodsToProps = (recipesAPI) => ({
    getRecipeById: recipesAPI.getRecipeById,
    getAllRecipes: recipesAPI.getAllRecipes,
});

export default withContext(mapMethodsToProps)(UpdateRecipe);
