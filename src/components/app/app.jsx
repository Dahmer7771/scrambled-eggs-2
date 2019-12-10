import React, { Component } from "react";
import "./app.css";
import { Route, Switch } from "react-router-dom";
import Header from "../header/header";
import RecipesSection from "../recipes-section/recipes-section";
import Footer from "../footer/footer";
import RecipesItemSection from "../recipes-item-section/recipes-item-section";
import Autorization from "../autorization/autorization";
import SearchSection from "../search-section/search-section";
import { RecipesProvider } from "../recipes-context/recipes-context";
import TestRecipes from "../../services/test-recipes";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesAPI: new TestRecipes(),
        };
    }

    componentDidMount() {}

    render() {
        const {
            recipesAPI,
        } = this.state;

        return (
            <RecipesProvider value={recipesAPI}>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={RecipesSection} />
                        <Route exact path="/recipes" component={RecipesSection} />
                        <Route path="/recipes/:id" component={RecipesItemSection} />
                        <Route path="/autorization" component={Autorization} />
                        <Route path="/search" component={SearchSection} />
                    </Switch>
                    <Footer />
                </div>
            </RecipesProvider>
        );
    }
}

export default App;
