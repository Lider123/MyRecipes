import Recipe from "../models/Recipe";
import Ingredient from "../models/Ingredient";

export const deserializeRecipes = function(json) {
  const recipes = [];
  if (!json.documents)
    return recipes;
  for (let i = 0; i < json.documents.length; i++) {
    const recipe = deserializeRecipe(json.documents[i]);
    recipes.push(recipe)
  }
  return recipes;
};

export const deserializeRecipe = function(json) {
  const recipe = new Recipe();
  recipe.id = getName(json.name);
  recipe.title = json.fields.title.stringValue;
  recipe.photo = json.fields.photo.stringValue;
  recipe.text = json.fields.text.stringValue;
  recipe.ingredients = deserializeIngredients(json.fields.ingredients.arrayValue.values);
  return recipe;
};

export const deserializeIngredients = function(json) {
  const ingredients = [];
  if (!json)
    return ingredients;
  for (let i = 0; i < json.length; i++) {
    const ingredient = deserializeIngredient(json[i]);
    ingredients.push(ingredient);
  }
  return ingredients;
};

export const deserializeIngredient = function(json) {
  const ingredient = new Ingredient();
  ingredient.id = json.mapValue.fields.id.stringValue;
  ingredient.name = json.mapValue.fields.name.stringValue;
  ingredient.count = json.mapValue.fields.count.stringValue;
  return ingredient;
};

const getName = function(str) {
  const split = str.split('/');
  return split[split.length-1]
};
