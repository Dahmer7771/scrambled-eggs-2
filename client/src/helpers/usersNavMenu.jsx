import React from "react";

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
            <a className="dropdown-item" href="/recipeClient">Рецепты</a>
            <a className="dropdown-item" href="/createRecipe">Добавить рецепт</a>
            <a className="dropdown-item" href="/updateRecipe">Редактировать рецепт</a>
            <a className="dropdown-item" href="/deleteRecipe">Удалить рецепт</a>
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
