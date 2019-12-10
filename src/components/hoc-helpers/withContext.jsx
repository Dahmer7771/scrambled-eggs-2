import React from "react";
import {
    RecipesConsumer,
} from "../recipes-context/recipes-context";

const withContext = (mapMethodsToProps) => (Wrapped) => (props) => (
    <RecipesConsumer>
        {
            (recipesAPI) => {
                const serviceProps = mapMethodsToProps(recipesAPI);
                return (
                    <Wrapped {...props} {...serviceProps} />
                );
            }
        }
    </RecipesConsumer>
);

export default withContext;
