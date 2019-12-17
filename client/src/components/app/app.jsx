import React, { Component } from "react";
import "./app.css";
import {
    Route,
    Switch,
} from "react-router-dom";
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
        this.state = {
            recipesAPI: new RecipesAPI(),
            selectedPage: 1,
            searchText: "",
        };
    }

    componentDidMount() {}

    onPageChange = (page) => {
        this.setState({
            selectedPage: page,
            searchText: "",
        });
    };

    onSearchInputChange = (searchText) => {
        console.log(searchText);
        this.setState({
            searchText,
        });
    };

    render() {
        const {
            recipesAPI,
            selectedPage,
            searchText,
        } = this.state;

        const WrappedRecipeSection = (props) => (
            <RecipesSection
                {...props}
                page={selectedPage}
                onPageChange={this.onPageChange}
                searchText={searchText}
            />
        );

        return (
            <RecipesProvider value={recipesAPI}>
                <div>
                    <Header onSearchInputChange={this.onSearchInputChange} />
                    <Switch>
                        <Route exact path="/" component={WrappedRecipeSection} />
                        {/* <Route exact path="/recipes" component={WrappedRecipeSection} /> */}
                        <Route
                            exact
                            path="/recipes"
                            render={(props) => (
                                <RecipesSection
                                    {...props}
                                    page={selectedPage}
                                    onPageChange={this.onPageChange}
                                    searchText={searchText}
                                />
                            )}
                        />
                        <Route exact path="/recipes/:id" component={RecipesItemSection} />
                        <Route path="/recipes/pages/:page" component={WrappedRecipeSection} />
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

export default App;
