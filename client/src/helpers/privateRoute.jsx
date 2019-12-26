import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            )}
        />
    );
};

export default PrivateRoute;
