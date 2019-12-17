import React, { Component } from "react";
import Select from "react-dropdown-select";

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
        };
    }

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
        // const {
        //     searchText,
        // } = this.state;

        const options = [{
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496",
                },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
                name: "Romaguera-Crona",
                catchPhrase: "Multi-layered client-server neural-net",
                bs: "harness real-time e-markets",
            },
        },
        {
            id: 2,
            name: "Ervin Howell",
            username: "Antonette",
            email: "Shanna@melissa.tv",
            address: {
                street: "Victor Plains",
                suite: "Suite 879",
                city: "Wisokyburgh",
                zipcode: "90566-7771",
                geo: {
                    lat: "-43.9509",
                    lng: "-34.4618",
                },
            },
            phone: "010-692-6593 x09125",
            website: "anastasia.net",
            company: {
                name: "Deckow-Crist",
                catchPhrase: "Proactive didactic contingency",
                bs: "synergize scalable supply-chains",
            },
        }];

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
                        {/* <input */}
                        {/*    id="searchInput" */}
                        {/*    type="text" */}
                        {/*    className="form-control" */}
                        {/*    placeholder="Recipient's username" */}
                        {/*    aria-label="Recipient's username" */}
                        {/*    aria-describedby="button-addon2" */}
                        {/*    value={searchText} */}
                        {/*    onChange={this.onSearchChange} */}
                        {/* /> */}
                        <Select
                            multi
                            options={options}
                            valueField="id"
                            onChange={(value) => console.log(value)}
                            searchable
                            labelField="username"
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

export default SearchInput;
