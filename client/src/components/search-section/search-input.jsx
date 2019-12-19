import React, { Component } from "react";
import Select from "react-dropdown-select";
import withContext from "../hoc-helpers/withContext";

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            ingredients: [],
        };
    }

    componentDidMount() {
        const {
            getAllIngredients,
        } = this.props;

        getAllIngredients()
            .then((data) => {
                this.setState({
                    ingredients: data,
                });
                console.log(this.state.ingredients);
            });
    }

    createSelectOption = (label) => ({
        id: label,
        name: label,
    });

    onSearchChange = (e) => {
        const { value } = e.target;
        this.setState({
            searchText: value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { onRecipeIngredientAdd } = this.props;
        const { searchText } = this.state;

        if (!searchText) return;

        onRecipeIngredientAdd(searchText);

        this.setState({
            searchText: "",
        });
    };

    render() {
        const {
            ingredients,
        } = this.state;

        const options = ingredients.map((item) => (
            this.createSelectOption(item)
        ));

        return (
            <div className="search-input">
                <h4>
                    <label htmlFor="searchInput">
                        Enter recipe ingredient
                    </label>
                </h4>
                <form
                    className="search-input"
                    onSubmit={this.onSubmit}
                >
                    <div className="input-group mb-3">
                        <Select
                            multi
                            options={options}
                            valueField="id"
                            onChange={(value) => console.log(value)}
                            searchable
                            labelField="name"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="submit"
                                id="button-addon2"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapMethodsToProps = (recipesAPI) => ({
    getAllIngredients: recipesAPI.getAllIngredients,
});

export default withContext(mapMethodsToProps)(SearchInput);
