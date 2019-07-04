import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeScreen from "./screens/RecipeScreen";
import CreateRecipeScreen from "./screens/CreateRecipeScreen";
import {Colors} from "./config";

export const navigationMap = {
  RecipeList: {
    screen: RecipeListScreen,
    navigationOptions: {
      title: "Recipes",
    },
  },
  Recipe: {
    screen: RecipeScreen,
    navigationOptions: {
      title: "Details",
    },
  },
  CreateRecipe: {
    screen: CreateRecipeScreen,
    navigationOptions: {
      title: "New recipe",
    },
  },
};

export const navigationConfig = {
  initialRouteName: "RecipeList",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.colorPrimary,
    },
    headerTintColor: Colors.colorOnPrimary,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
};