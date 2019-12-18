import React, { Component } from "react";
import "./pagination.css";
import { Link } from "react-router-dom";
import withContext from "../hoc-helpers/withContext";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagesCount: null,
        };
    }

    componentDidMount() {
        const {
            getRecipesCount,
            recipesPerPage,
        } = this.props;

        getRecipesCount()
            .then((response) => {
                const pagesCount = Math.ceil(response / recipesPerPage);
                this.setState({
                    pagesCount,
                });
            });
    }

    render() {
        const {
            pagesCount,
        } = this.state;

        const {
            onPageChange,
        } = this.props;

        const paginationRender = () => {
            const rendered = [];
            for (let i = 1; i <= pagesCount; i++) {
                rendered.push(i);
            }
            return rendered;
        };

        const renderedPagination = paginationRender();

        return (
            <div className="pagination">
                <div className="container">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link" href="/" tabIndex="-1">Previous</a>
                            </li>
                            {
                                renderedPagination.map((page) => {
                                    return (
                                        <li
                                            onClick={() => onPageChange(page)}
                                            key={page}
                                            className="page-item custom-page-item"
                                        >
                                            <Link to={`/recipes/page/${page}`}>
                                                <div className="page-link ">
                                                    {page}
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                            <li className="page-item">
                                <a className="page-link" href="/">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapMethodsToProps = (recipesAPI) => ({
    getRecipesCount: recipesAPI.getRecipesCount,
});

export default withContext(mapMethodsToProps)(Pagination);
