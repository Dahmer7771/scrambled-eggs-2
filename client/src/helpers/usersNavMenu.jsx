import React from "react";

const simpleUser = [
    {
        id: 1,
        label: "Рецепты",
        url: "/recipes/page/1",
    },
    {
        id: 2,
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
        id: 1,
        label: "Рецепты",
        url: "/recipes/page/1",
    },
    {
        id: 2,
        label: "Поиск по ингредиентам",
        url: "/search",
    },

];

const settings = () => (
    <li key={500} className="nav-item dropdown">
        <a
            className="nav-link dropdown-toggle"
            href="settings"
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
            <a className="dropdown-item" href="/recipe_client">Рецепты</a>
            <a className="dropdown-item" href="/created">Добавить рецепты</a>
            <a className="dropdown-item" href="/users">Пользователи</a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="exit">Выйти</a>
        </div>
    </li>
);

export {
    admin,
    simpleUser,
    settings,
};
