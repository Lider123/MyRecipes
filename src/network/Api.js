import * as Serializers from "./Serializers";
import firebase from "react-native-firebase";

export default class Api {
  static BASE_API = "https://firestore.googleapis.com/v1/projects/myrecipes-39edd/databases/(default)/documents";

  static getRecipes() {
    return firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => fetch(Api.BASE_API + "/recipes", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      }))
      .then((response) => response.json());
  }

  static createOrUpdateRecipe(recipe) {
    const data = Serializers.serializeRecipe(recipe);
    return firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => fetch(Api.BASE_API + "/recipes/" + recipe.id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      }));
  }

  static deleteRecipe(id) {
    return firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => fetch(Api.BASE_API + "/recipes/" + id, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      }))
      .then((response) => response.json());
  }
}