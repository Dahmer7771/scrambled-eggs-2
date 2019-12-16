import React from "react";

const simpleUser = [
    {
        label: "Рецепты",
        url: "/recipes/pages/1",
    },
    {
        label: "Поиск по ингредиентам",
        url: "/search",
    },
    // {
    //     label: "Вход/Регистрация",
    //     url: "/autorization",
    // },
];

const admin = [
    {
        label: "Рецепты",
        url: "/recipes/pages/1",
    },
    {
        label: "Поиск по ингредиентам",
        url: "/search",
    },

];

const settings = () => (
    <li className="nav-item dropdown">
        <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
                color: "white",
            }}
        >
            Настройки
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/management">Рецепты</a>
            <a className="dropdown-item" href="/created">Добавить рецепты</a>
            <a className="dropdown-item" href="/users">Пользователи</a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">Выйти</a>
        </div>
    </li>
);

export {
    admin,
    simpleUser,
    settings,
};
