import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeScreen from "./screens/RecipeScreen";
import EditRecipeScreen from "./screens/EditRecipeScreen";
import Colors from "./config/Colors";
import translate from "./utils/language.utils"

export const navigationMap = {
  RecipeList: {
    screen: RecipeListScreen,
    navigationOptions: {
      title: translate("RECIPE_LIST_SCREEN_title"),
    },
  },
  Recipe: {
    screen: RecipeScreen,
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