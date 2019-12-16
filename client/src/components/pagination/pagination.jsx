import React, { Component } from "react";
import "./pagination.css";
import { Link } from "react-router-dom";
import withContext from "../hoc-helpers/withContext";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
        };
    }

    componentDidMount() {
        // const {
        //     getRecipesCount,
        // } = this.props;

        this.setState({
            recipes: 2,
        });
    }

    render() {
        const {
            recipes,
        } = this.state;

        const {
            onPageChange,
        } = this.props;

        const pagesCount = Math.ceil(recipes / 12);
        const paginationRender = () => {
            const rendered = [];
            for (let i = 0; i < pagesCount; i++) {
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
                                    const itemKey = page;
                                    const itemLabel = page + 1;

                                    return (
                                        <li
                                            onClick={() => onPageChange(itemLabel)}
                                            key={itemKey}
                                            className="page-item custom-page-item"
                                        >
                                            <Link to={`/recipes/pages/${itemLabel}`}>
                                                <div className="page-link ">
                                                    {itemLabel}
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

});

export default withContext(mapMethodsToProps)(Pagination);
