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
import CreatedRecipe from "../create-recipe/create-recipe";
import RecipeClient from "../recipe-client/recipe-client";
import ChangeRecipeClient from "../change-recipe-client/change-recipe-client";
import UpdateRecipe from "../update-recipe/update-recipe";
import DeleteRecipe from "../delete-recipe/delete-recipe";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesAPI: new RecipesAPI(),
            currentPage: 1,
            searchText: "",
            isAuthorized: false,
        };
    }

    componentDidMount() {
        const {
            recipesAPI,
        } = this.state;

        recipesAPI.isUserAuth()
            .then((res) => {
                this.setState({
                    isAuthorized: res.isAuth,
                });
            })
            .catch((err) => console.log(err));
    }

    onAuthorizationSwitch = (isAuthorized) => {
        this.setState({
            isAuthorized,
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
            isAuthorized,
        } = this.state;

        return (
            <RecipesProvider value={recipesAPI}>
                <div>
                    <Header
                        isAuthorized={isAuthorized}
                        onAuthorizationSwitch={this.onAuthorizationSwitch}
                        onSearchInputChange={this.onSearchInputChange}
                    />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <RecipesSection
                                    {...props}
                                    currentPage={currentPage}
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
                                    searchText={searchText}
                                />
                            )}
                        />
                        <Route exact path="/recipes/:id" component={RecipesItemSection} />
                        <Route
                            path="/autorization"
                            render={(props) => (
                                <Autorization
                                    {...props}
                                    isAuthorized={isAuthorized}
                                    onAuthorizationSwitch={this.onAuthorizationSwitch}
                                />
                            )}
                        />
                        <Route path="/search" component={SearchSection} />
                        <Route path="/users" component={Users} />
                        <Route path="/createRecipe" component={CreatedRecipe} />
                        <Route path="/updateRecipe" component={UpdateRecipe} />
                        <Route path="/deleteRecipe" component={DeleteRecipe} />
                        <Route path="/recipeClient" component={RecipeClient} />
                        <Route path="/change" component={ChangeRecipeClient} />
                    </Switch>
                    <Footer />
                </div>
            </RecipesProvider>
        );
    }
}

export default withCookies(App);
