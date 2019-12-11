import React, { Component } from "react";
import withContext from "../hoc-helpers/withContext";
import {Link} from "react-router-dom";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
        };
    }

    componentDidMount() {
        const {
            getRecipesCount,
        } = this.props;

        this.setState({
            recipes: getRecipesCount(),
        });
    }

    render() {
        const {
            recipes,
        } = this.state;

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
                                <a className="page-link" href="#" tabIndex="-1">Previous</a>
                            </li>
                            {
                                renderedPagination.map((page) => {
                                    const itemKey = page;
                                    const itemLabel = page + 1;

                                    return (
                                        <li key={itemKey} className="page-item">
                                            <div className="page-link">
                                                <Link to={`/recipes/pages/${itemLabel}`}>
                                                    {itemLabel}
                                                </Link>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
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
