import { createStackNavigator, createAppContainer } from "react-navigation";

import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeScreen from "./screens/RecipeScreen";
import CreateRecipeScreen from "./screens/CreateRecipeScreen";
import {Colors} from "./config";

const AppNavigator = createStackNavigator({
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
}, {
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
});

export default createAppContainer(AppNavigator);
