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

export const serializeRecipe = function(recipe) {
  return {
    name: "projects/myrecipes-39edd/databases/(default)/documents/recipes/" + recipe.id,
    fields: {
      ingredients: serializeIngredients(recipe.ingredients),
      title: {
        stringValue: recipe.title,
      },
      photos: {
        arrayValue: recipe.photos.length > 0 ? serializePhotos(recipe.photos) : {}
      },
      text: {
        stringValue: recipe.text,
      }
    },
  };
};

export const serializeRecipes = function(recipes) {
  return {
    documents: recipes.map(serializeRecipe),
  };
};

const serializePhotos = function(photos) {
  return {
    values: photos.map(item => {
      return {
        stringValue: item
      };
    }),
  };
};