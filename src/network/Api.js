import * as Serializers from "./Serializers";

export default class Api {
  static BASE_API = "https://firestore.googleapis.com/v1/projects/myrecipes-39edd/databases/(default)/documents";

  static getRecipes() {
    return fetch(Api.BASE_API + "/recipes")
      .then((response) => response.json())
  }

  static putRecipe(recipe) {
    const data = Serializers.serializeRecipe(recipe);
    return fetch(Api.BASE_API + "/recipes/" + recipe.id, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}