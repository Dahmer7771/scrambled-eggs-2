import React, { Component } from "react";
import "./nav-menu.css";
import { Link } from "react-router-dom";
import Search from "../search/search";
import {
    admin as ADMIN,
    simpleUser as SIMPLE_USER,
    Settings,
} from "../../helpers/users-nav-menu";

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userRole: "admin",
            simpleUser: SIMPLE_USER,
            admin: ADMIN,
            isAuthorized: false,
        };
    }

    componentDidMount() {
        this.setNavPanel();
    }

    componentDidUpdate(prevProps) {
        const {
            isAuthorized,
        } = this.props;

        if (prevProps.isAuthorized !== isAuthorized) {
            this.setNavPanel();
        }
    }

    setNavPanel = () => {
        const {
            isAuthorized,
        } = this.props;

        this.setState({
            isAuthorized,
        });
    };

    renderNavItems = () => {
        const {
            admin,
            simpleUser,
            isAuthorized,
        } = this.state;

        // switch (userRole) {
        // case "admin":
        //     return admin;
        // case "registeredUser":
        //     return simpleUser;
        // default:
        //     return simpleUser;
        // }

        switch (isAuthorized) {
        case true:
            return admin;
        case false:
            return simpleUser;
        default:
            return simpleUser;
        }
    };

    render() {
        const {
            isAuthorized,
        } = this.state;

        const {
            onSearchInputChange,
            onAuthorizationSwitch,
        } = this.props;
        const navItems = this.renderNavItems();

        let renderNavItems = navItems.map(({ id, label, url }) => (
            <li key={id} className="nav-item">
                <span className="nav-link">
                    <Link to={url}>{label}</Link>
                </span>
            </li>
        ));

        if (isAuthorized) {
            const settingsNavItem = (
                <Settings
                    key={500}
                    onAuthorizationSwitch={onAuthorizationSwitch}
                />
            );

            renderNavItems = [
                ...renderNavItems,
                settingsNavItem,
            ];
        }

        return (
            <>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {renderNavItems}
                    </ul>
                    <div className="nav-search">
                        <Search
                            onSearchInputChange={(searchText) => onSearchInputChange(searchText)}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default NavMenu;
