import React from 'react';
import './RecipePage.css';

class RecipePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <header></header>
                <main>
                    <figure>
                        <img src="#" />
                        <figcaption className="recipe-title">

                        </figcaption>
                    </figure>
                    <div className="recipe-description">

                    </div>
                </main>
                <footer></footer>
            </React.Fragment>
        );
    }
}

export default RecipePage;