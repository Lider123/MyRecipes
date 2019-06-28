import Recipe from "../models/Recipe";
import Ingredient from "../models/Ingredient";

export default function getRecipes() {
  let recipes = [];

  let recipe = new Recipe();
  recipe.id = "1";
  recipe.title = "Cucumber and Tomato Salad";
  recipe.ingredients = [
    new Ingredient("tomato", "2 pieces"),
    new Ingredient("cucumber", "2 pieces"),
    new Ingredient("mayo", "to taste"),
  ];
  recipe.photo = "https://loremflickr.com/320/240/food";
  recipe.text = "Cut cucumbers and tomatoes, season with mayonnaise.";
  recipes.push(recipe);

  recipe = new Recipe();
  recipe.id = "2";
  recipe.title = "Boiled sausages";
  recipe.ingredients = [
    new Ingredient("sausages", "2 pieces")
  ];
  recipe.photo = "https://loremflickr.com/320/240/food";
  recipe.text = "Boil the water, put the sausages in boiling water, turn down the heat and cook for 5 minutes.";
  recipes.push(recipe);

  recipe = new Recipe();
  recipe.id = "3";
  recipe.title = "Boiled eggs";
  recipe.ingredients = [
    new Ingredient("eggs", "2 pieces")
  ];
  recipe.photo = "https://loremflickr.com/320/240/food";
  recipe.text = "Dip the eggs in a pan with cold water, put on a high heat, let the water boil. After that, reduce the heat and cook for 5 minutes.";
  recipes.push(recipe);

  return recipes;
}
