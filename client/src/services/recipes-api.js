export default class RecipesAPI {
    _baseUrl = "http://192.168.1.7:3000/api";

    getResource = async (url) => {
        const res = await fetch(`${this._baseUrl}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url},`
                + `received ${res.status}`);
        }

        const body = await res.json();
        return body;
    };

    getAllRecipes = async () => (
        await this.getResource(`/recipes/articles`)
    );

    getRecipeById = async (id) => (
        await this.getResource(`/recipes/article_by_id?id=${id}`)
    );

    getSortedRecipes = async (field, order) => (
        await this.getResource(`/recipes/articles?sortBy=${field}&order=${order}&limit=30`)
    );

    getRecipesWithSkip = async (skip, limit) => (
        await this.getResource(`/recipes/articles?skip=${skip}&limit=${limit}`)
    );

    getRecipesCount = async () => (
        await this.getResource(`/recipes/articles_number`)
    );

    postForm = async (url, formSelector) => {
        const formData = new FormData(document.querySelector(formSelector));

        const body = await fetch(url, {
            method: "POST", // 'GET', 'PUT', 'DELETE', etc.
            body: formData, // a FormData will automatically set the 'Content-Type'
        })
            .then((response) => response.json())
            .catch((error) => console.error(error));
    };
}
