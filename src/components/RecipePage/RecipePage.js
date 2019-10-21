import React from 'react';
import './RecipePage.css';

class RecipePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            image: this.props.image,
        }
    }

    render() {
        const id = localStorage.getItem('recipeId');
        const title = localStorage.getItem('recipeTitle');
        const image = localStorage.getItem('recipeImage');
        const description = localStorage.getItem('recipeDescription');

        return (
            <React.Fragment>
                <header>{id}</header>
                <main>
                    <figure>
                        <img src={image} />
                        <figcaption className="recipe-title">
                            {title}
                        </figcaption>
                    </figure>
                    <div className="recipe-description">
                        {description}
                    </div>
                </main>
                <footer></footer>
            </React.Fragment>
        );
    }
}

export default RecipePage;