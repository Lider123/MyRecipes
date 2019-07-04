export default class Api {
  static BASE_API = "https://firestore.googleapis.com/v1/projects/myrecipes-39edd/databases/(default)/documents";

  static getRecipes() {
    return fetch(Api.BASE_API + "/recipes")
      .then((response) => response.json())
  }
}