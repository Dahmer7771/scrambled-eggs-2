// eslint-disable-next-line no-return-await
export default class RecipesAPI {
    _baseUrl = "http://localhost:3000/api";

    getResource = async (url, method, field, value) => {
        let res;

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
        await this.getResource(`/recipes/articles?sortBy=${field}&order=${order}&limit=30`)
    );

    getRecipesWithSkip = async (skip, limit) => (
        await this.getResource(`/recipes/articles?skip=${skip}&limit=${limit}`)
    );

    getRecipesCount = async () => (
        await this.getResource(`/recipes/articles_number`)
    );

    postForm = async (formSelector) => {
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
