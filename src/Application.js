import { createStackNavigator, createAppContainer } from "react-navigation";
import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeScreen from "./screens/RecipeScreen";

const AppNavigator = createStackNavigator({
  RecipeList: {
    screen: RecipeListScreen,
  },
  Recipe: {
    screen: RecipeScreen,
  }
});

export default createAppContainer(AppNavigator);
