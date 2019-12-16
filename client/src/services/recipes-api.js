export default class RecipesAPI {
    _baseUrl = "http://192.168.1.4:3000/api";

    getResource = async (url) => {
        const res = await fetch(`${this._baseUrl}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url},`
                + `received ${res.status}`);
        }

        const body = await res.json();
        return body;
    };

    getAllRecipes = async () => {
        const res = await this.getResource(`/recipes/articles`);
        return res;
    };

    getRecipeById = async (id) => {
        const res = await this.getResource(`/recipes/article_by_id?id=${id}`);
        return res;
    };

    getSortedRecipes = async (field, order) => {
        const res = await this.getResource(`/recipes/articles?sortBy=${field}&order=${order}&limit=30`);
        return res;
    };
}
