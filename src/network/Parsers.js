import Recipe from "../models/Recipe";
import Ingredient from "../models/Ingredient";

export const parseRecipes = function(json) {
  const recipes = [];
  for (let i = 0; i < json.documents.length; i++) {
    const recipe = parseRecipe(json.documents[i]);
    recipes.push(recipe)
  }
  return recipes;
};

export const parseRecipe = function(json) {
  const recipe = new Recipe();
  recipe.id = getName(json.name);
  recipe.title = json.fields.title.stringValue;
  recipe.photo = json.fields.photo.stringValue;
  recipe.text = json.fields.text.stringValue;
  recipe.ingredients = parseIngredients(json.fields.ingredients.arrayValue.values);
  return recipe;
};

export const parseIngredients = function(json) {
  const ingredients = [];
  for (let i = 0; i < json.length; i++) {
    const ingredient = parseIngredient(json[i]);
    ingredients.push(ingredient);
  }
  return ingredients;
};

export const parseIngredient = function(json) {
  const ingredient = new Ingredient();
  ingredient.name = json.mapValue.fields.name.stringValue;
  ingredient.count = json.mapValue.fields.count.stringValue;
  return ingredient;
};

const getName = function(str) {
  const split = str.split('/');
  return split[split.length-1]
};