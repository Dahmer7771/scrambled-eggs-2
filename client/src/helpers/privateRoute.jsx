import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    console.log(typeof isAuth);
    return (
        <Route
            {...rest}
            render={(props) => (
                isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            )}
        />
    );
};

export default PrivateRoute;
