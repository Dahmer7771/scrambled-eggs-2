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
import PrivateRoute from "../../helpers/privateRoute";

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
                        <PrivateRoute isAuthorized={isAuthorized} path="/createRecipe" component={CreatedRecipe} />
                        <PrivateRoute isAuthorized={isAuthorized} path="/updateRecipe" component={UpdateRecipe} />
                        <PrivateRoute isAuthorized={isAuthorized} path="/deleteRecipe" component={DeleteRecipe} />
                        <PrivateRoute isAuthorized={isAuthorized} path="/recipeClient" component={RecipeClient} />
                        <PrivateRoute isAuthorized={isAuthorized} path="/change" component={ChangeRecipeClient} />
                        <Route
                            path="/users"
                            render={() => (
                                <div>
                                    <h2>Поздравляем, вы успешно зарегестрировались!</h2>
                                    <h4>
                                        Приветственное письмо было отправдено
                                        на указанную вами почту
                                    </h4>
                                </div>
                            )}
                        />
                    </Switch>
                    <Footer />
                </div>
            </RecipesProvider>
        );
    }
}

export default withCookies(App);
