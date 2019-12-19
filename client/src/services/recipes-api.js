// eslint-disable-next-line no-return-await
export default class RecipesAPI {
<<<<<<< HEAD
    _baseUrl = "http://localhost:3000/api";
=======
    _baseUrl = "http://192.168.137.84:3000/api";
>>>>>>> 4c37beb8e6df808e74b0943326f547d7189173ee

    getResource = async (url) => {
        const res = await fetch(`${this._baseUrl}${url}`);

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
        return res.map((item) => item.name);
    };

    postRecipe = async (formSelector) => {
        const formData = new FormData(document.querySelector(formSelector));

        return await fetch(`${this._baseUrl}/recipe/create`,
            {
                method: "POST",
                body: formData,
            })
            .then((response) => response.json())
            .catch((error) => console.error(error));
    };
}
