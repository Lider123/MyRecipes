import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeScreen from "./screens/RecipeScreen";
import EditRecipeScreen from "./screens/EditRecipeScreen";
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
  EditRecipe: {
    screen: EditRecipeScreen,
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