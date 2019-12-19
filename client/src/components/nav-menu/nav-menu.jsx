import React, { Component } from "react";
import "./nav-menu.css";
import { Link } from "react-router-dom";
import Search from "../search/search";
import {
    admin as ADMIN,
    simpleUser as SIMPLE_USER,
    settings,
} from "../../helpers/usersNavMenu";

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: "simpleUser",
            simpleUser: SIMPLE_USER,
            admin: ADMIN,
        };
    }

    renderNavItems = () => {
        const {
            userRole,
            admin,
            simpleUser,
        } = this.state;

        switch (userRole) {
        case "admin":
            return admin;
        case "simpleUser":
            return simpleUser;
        default:
            return simpleUser;
        }
    };

    render() {
        const {
            userRole,
        } = this.state;

        const {
            onSearchInputChange,
        } = this.props;
        const navItems = this.renderNavItems();

        let renderNavItems = navItems.map(({ id, label, url }) => (
            <li key={id} className="nav-item">
                <span className="nav-link">
                    <Link to={url}>{label}</Link>
                </span>
            </li>
        ));

        if (userRole === "admin") {
            const settingsNavItem = settings();

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
