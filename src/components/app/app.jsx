import React, { Component } from "react";
import "./app.css";
import { Route, Switch } from "react-router-dom";
import Header from "../header/header";
import RecipesSection from "../recipes-section/recipes-section";
import Footer from "../footer/footer";
import RecipesItemSection from "../recipes-item-section/recipes-item-section";
import Autorization from "../autorization/autorization";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={RecipesSection} />
                    <Route exact path="/recipes" component={RecipesSection} />
                    <Route path="/recipes/:id" component={RecipesItemSection} />
                    <Route path="/autorization" component={Autorization} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
