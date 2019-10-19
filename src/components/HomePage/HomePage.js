import React, { Component } from 'react';
import Header from "../Header/Header";
import CustomHR from "../CustomHR/CustomHR";
import RecipesSection from "../RecipesSection/RecipesSection";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <CustomHR />
                <RecipesSection />
                <CustomHR />
                <Footer />
            </React.Fragment>
        );
    }
}

export default HomePage;