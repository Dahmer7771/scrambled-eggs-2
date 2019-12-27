import React from "react";
import { Link } from "react-router-dom";
import "./dropdown-list.css";
import RecipesAPI from "../services/recipes-api";

const simpleUser = [
    {
        id: 1,
        label: "Рецепты",
        url: "/recipes",
    },
    {
        id: 2,
        label: "Поиск по ингредиентам",
        url: "/search",
    },
    {
        id: 3,
        label: "Вход/Регистрация",
        url: "/autorization",
    },
];

const admin = [
    {
        id: 1,
        label: "Рецепты",
        url: "/recipes",
    },
    {
        id: 2,
        label: "Поиск по ингредиентам",
        url: "/search",
    },
];

const Settings = (props) => {
    const {
        onAuthorizationSwitch,
    } = props;


    const onLogout = () => {
        const recipesAPI = new RecipesAPI();
        recipesAPI.logout()
            .then((res) => {
                if (res.success) {
                    onAuthorizationSwitch(false);
                }
                if (res.error) {
                    onAuthorizationSwitch(false);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <li key={500} className="nav-item dropdown">
            <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{
                    color: "white",
                    cursor: "pointer",
                }}
            >
                Настройки
            </div>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/createRecipe">
                    <div className="dropdown-item">
                    Добавить рецепт
                    </div>
                </Link>
                <Link to="/updateRecipe">
                    <div className="dropdown-item">
                    Редактировать рецепт
                    </div>
                </Link>
                <Link to="/deleteRecipe">
                    <div className="dropdown-item">
                    Удалить рецепт
                    </div>
                </Link>
                <Link to="/users">
                    <div className="dropdown-item">
                        Пользователи
                    </div>
                </Link>
                <Link to="/account">
                    <div className="dropdown-item">
                        Личный профиль
                    </div>
                </Link>
                <div className="dropdown-divider" />
                <Link to="/autorization">
                    <div className="dropdown-item">
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={onLogout}
                        >
                            Выйти
                        </span>
                    </div>
                </Link>
            </div>
        </li>
    );
};

export {
    admin,
    simpleUser,
    Settings,
};
