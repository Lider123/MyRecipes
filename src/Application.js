import { createStackNavigator, createAppContainer } from "react-navigation";

import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeScreen from "./screens/RecipeScreen";
import CreateRecipeScreen from "./screens/CreateRecipeScreen";

const AppNavigator = createStackNavigator({
  RecipeList: {
    screen: RecipeListScreen,
  },
  Recipe: {
    screen: RecipeScreen,
  },
  CreateRecipe: {
    screen: CreateRecipeScreen,
  },
}, {
  initialRouteName: "RecipeList",
});

export default createAppContainer(AppNavigator);
