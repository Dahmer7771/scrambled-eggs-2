import React, { Component } from "react";
import "./app.css";
import {
    Route,
    Switch,
} from "react-router-dom";
import { withCookies } from "react-cookie";
import Header from "../header/header";
import RecipesSection from "../recipes-section/recipes-section";
import Footer from "../footer/footer";
import RecipesItemSection from "../recipes-item-section/recipes-item-section";
import Autorization from "../autorization/autorization";
import SearchSection from "../search-section/search-section";
import { RecipesProvider } from "../recipes-context/recipes-context";
import RecipesAPI from "../../services/recipes-api";
import Users from "../users/users";
import CreatedRecipe from "../created-recipe/created-recipe";
import RecipeClient from "../recipe-client/recipe-client";
import ChangeRecipeClient from "../change-recipe-client/change-recipe-client";

class App extends Component {
    constructor(props) {
        super(props);
        // const { cookies } = props;
        this.state = {
            recipesAPI: new RecipesAPI(),
            currentPage: 1,
            searchText: "",
            // name: cookies.get("w_auth"),
            // recipesPerPage: 4,
        };
    }

    componentDidMount() {

    }

    onPageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    onSearchInputChange = (searchText) => {
        this.setState({
            searchText,
        });
    };

    render() {
        const {
            recipesAPI,
            currentPage,
            searchText,
            // recipesPerPage,
        } = this.state;

        return (
            <RecipesProvider value={recipesAPI}>
                <div>
                    <Header onSearchInputChange={this.onSearchInputChange} />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <RecipesSection
                                    {...props}
                                    currentPage={currentPage}
                                    onPageChange={this.onPageChange}
                                    searchText={searchText}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/recipes"
                            render={(props) => (
                                <RecipesSection
                                    {...props}
                                    currentPage={currentPage}
                                    onPageChange={this.onPageChange}
                                    searchText={searchText}
                                />
                            )}
                        />
                        <Route exact path="/recipes/:id" component={RecipesItemSection} />
                        <Route path="/autorization" component={Autorization} />
                        <Route path="/search" component={SearchSection} />
                        <Route path="/users" component={Users} />
                        <Route path="/created" component={CreatedRecipe} />
                        <Route path="/recipe_client" component={RecipeClient} />
                        <Route path="/change" component={ChangeRecipeClient} />
                    </Switch>
                    <Footer />
                </div>
            </RecipesProvider>
        );
    }
}

export default withCookies(App);
