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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesAPI: new RecipesAPI(),
            selectedPage: 1,
        };
    }

    componentDidMount() {}

    onPageChange = (page) => {
        this.setState({
            selectedPage: page,
        });
    };

    render() {
        const {
            recipesAPI,
            selectedPage,
        } = this.state;

        const WrappedRecipeSection = (props) => (
            <RecipesSection {...props} page={selectedPage} onPageChange={this.onPageChange} />
        );

        return (
            <RecipesProvider value={recipesAPI}>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={WrappedRecipeSection} />
                        <Route exact path="/recipes" component={RecipesSection} />
                        <Route exact path="/recipes/:id" component={RecipesItemSection} />
                        <Route path="/recipes/pages/:page" component={WrappedRecipeSection} />
                        <Route path="/autorization" component={Autorization} />
                        <Route path="/search" component={SearchSection} />
                        <Route path="/users" component={Users} />
                    </Switch>
                    <Footer />
                </div>
            </RecipesProvider>
        );
    }
}

export default App;
