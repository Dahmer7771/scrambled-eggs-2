import React, { Component } from "react";
import "./search.css";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <form className="search form-inline my-2 my-lg-0">
                <input className="form-control form-control-sm mr-sm-2" type="search" placeholder="Название блюда" aria-label="Search" />
                <button
                    className="btn btn-sm btn-outline-success my-2 my-sm-0"
                    type="submit"
                >
                        Поиск
                </button>
            </form>
        );
    }
}

export default Search;