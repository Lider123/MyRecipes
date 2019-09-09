import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeScreen from "./screens/RecipeScreen";
import EditRecipeScreen from "./screens/EditRecipeScreen";
import Colors from "./config/Colors";
import translate from "./utils/language.utils"
import LogInScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";

export const appNavigationMap = {
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

export const appNavigationConfig = {
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

export const authNavigationMap = {
  LogIn: {
    screen: LogInScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
};

export const authNavigationConfig = {
  initialRouteName: "LogIn",
  defaultNavigationOptions: {
    header: null,
  }
};
