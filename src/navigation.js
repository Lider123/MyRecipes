import HomeScreen from "./screens/HomeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import EditRecipeScreen from "./screens/EditRecipeScreen";
import Colors from "./config/Colors";
import translate from "./utils/language.utils"
import LogInScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FeedScreen from "./screens/FeedScreen";

export const homeNavigationMap = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: translate("HOME_SCREEN_title"),
    },
  },
  Recipe: {
    screen: RecipeScreen,
  },
  EditRecipe: {
    screen: EditRecipeScreen,
  },
};

export const homeNavigationConfig = {
  initialRouteName: "Home",
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

export const feedNavigationMap = {
  Feed: {
    screen: FeedScreen,
    navigationOptions: {
      title: translate("FEED_SCREEN_title"),
    },
  },
  Recipe: {
    screen: RecipeScreen,
  },
};

export const feedNavigationConfig = {
  initialRouteName: "Feed",
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

export const settingsNavigationMap = {
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: translate("SETTINGS_SCREEN_title")
    }
  }
};

export const settingsNavigationConfig = {
  initialRouteName: "Settings",
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
