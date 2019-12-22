// eslint-disable-next-line no-return-await
export default class RecipesAPI {
    _baseUrl = "http://localhost:3000/api";

    getResource = async (url, method, body) => {
        let res;

        if (typeof method === "undefined") {
            res = await fetch(`${this._baseUrl}${url}`);
        } else {
            // const bodyObj = {};
            // bodyObj[body.field] = body.value;

            res = await fetch(`${this._baseUrl}${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
        }

        if (!res.ok) {
            throw new Error(`Could not fetch ${url},`
                + `received ${res.status}`);
        }

        return await res.json();
    };

    getAllRecipes = async () => (
        await this.getResource(`/recipes/articles`)
    );

    getRecipeById = async (id) => (
        await this.getResource(`/recipes/article_by_id?id=${id}`)
    );

    getSortedRecipes = async (field, order) => (
        await this.getResource(`/recipes/articles?sortBy=${field}&order=${order}`)
    );

    getRecipesWithSkip = async (skip, limit) => (
        await this.getResource(`/recipes/articles?skip=${skip}&limit=${limit}`)
    );

    getRecipesCount = async () => (
        await this.getResource(`/recipes/articles_number`)
    );

    getAllIngredients = async () => {
        const res = await this.getResource(`/recipes/ingredients`);
        return res.map((item) => ({
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            name: item.name,
        }));
    };

    getRecipesByIngredients = async (value) => (
        await this.getResource(`/recipes/article_by_ingredients`, "POST", { ingredients: value })
    );

    postRecipe = async (formSelector) => {
        const formData = new FormData(document.querySelector(formSelector));

        // return await fetch(`${this._baseUrl}/recipe/create`,
        //     {
        //         method: "POST",
        //         body: formData,
        //     })
        //     .then((response) => response.json())
        //     .catch((error) => console.error(error));

        return await this.getResource(`/recipe/create`, "POST", formData);
    };

    toRegister = async (formSelector) => {
        const formData = new FormData(document.querySelector(formSelector));
        return await this.getResource(`/users/register`, "POST", formData);
    };

    logIn = async (formSelector) => {
        const formData = new FormData(document.querySelector(formSelector));
        return await this.getResource(`/users/login`, "POST", formData);
    };
}
