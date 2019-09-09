import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import {authNavigationConfig, authNavigationMap, appNavigationConfig, appNavigationMap} from "./navigation";
import SplashScreen from "./screens/SplashScreen";

const AppStack = createStackNavigator(appNavigationMap, appNavigationConfig);
const AuthStack = createStackNavigator(authNavigationMap, authNavigationConfig);

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Splash",
    }
  )
);
