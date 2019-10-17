import * as Serializers from "./Serializers";
import firebase from "react-native-firebase";

export default class Api {
  static BASE_API = "https://firestore.googleapis.com/v1/projects/myrecipes-39edd/databases/(default)/documents";
  static QUERY_API = "https://firestore.googleapis.com/v1/projects/myrecipes-39edd/databases/(default)/documents:runQuery";

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

  static getFeed() {
    const body = {
      structuredQuery: {
        from: [
          { collectionId: "recipes" },
        ],
        orderBy: [
          {
            field: { fieldPath: "updatedAt" },
            direction: "DESCENDING",
          },
        ],
      }
    };
    return firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => fetch(Api.QUERY_API, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(body),
      }))
      .then((response) => response.json());
  }

  static getRecipesByAuthor(author) {
    const body = {
      structuredQuery: {
        from: [
          { collectionId: "recipes" },
        ],
        where: {
          fieldFilter : {
            field: { fieldPath: "author" },
            op: "EQUAL",
            value: { stringValue: author }
          }
        },
        orderBy: [
          {
            field: { fieldPath: "title" },
            direction: "ASCENDING",
          },
        ],
      }
    };
    return firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => fetch(Api.QUERY_API, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(body),
      }))
      .then((response) => response.json());
  }

  static getUser(id) {
    return firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => fetch(Api.BASE_API + "/users/" + id, {
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

  static createOrUpdateUser(user) {
    const data = Serializers.serializeUser(user);
    return firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => fetch(Api.BASE_API + "/users/" + user.id, {
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