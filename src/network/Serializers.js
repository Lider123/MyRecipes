export const serializeIngredient = function(ingredient) {
  return {
    mapValue: {
      fields: {
        id: {
          stringValue: ingredient.id,
        },
        count: {
          stringValue: ingredient.count,
        },
        name: {
          stringValue: ingredient.name,
        }
      }
    }
  };
};

export const serializeIngredients = function(ingredients) {
  return {
    arrayValue: {
      values: ingredients.map(serializeIngredient),
    }
  };
};

export const serializeUser = function(user) {
  const favourites = user.favourites.map(serializeString);
  return {
    name: "projects/myrecipes-39edd/databases/(default)/documents/users/" + user.id,
    fields: {
      favourites: {
        arrayValue: {
          values: favourites,
        },
      },
    },
  };
};

function serializeString(s) {
  return { stringValue: s }
}

export const serializeRecipe = function(recipe) {
  return {
    name: "projects/myrecipes-39edd/databases/(default)/documents/recipes/" + recipe.id,
    fields: {
      ingredients: serializeIngredients(recipe.ingredients),
      author: {
        stringValue: recipe.author,
      },
      title: {
        stringValue: recipe.title,
      },
      photo: {
        stringValue: recipe.photo,
      },
      text: {
        stringValue: recipe.text,
      },
      updatedAt: {
        integerValue: recipe.updatedAt,
      },
    },
  };
};

export const serializeRecipes = function(recipes) {
  return {
    documents: recipes.map(serializeRecipe),
  };
};
