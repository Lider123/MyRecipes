import React from "react";
import {Text} from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons"

import {
  authNavigationConfig,
  authNavigationMap,
  homeNavigationConfig,
  homeNavigationMap
} from "./navigation";
import SplashScreen from "./screens/SplashScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Colors from "./config/Colors";
import translate from "./utils/language.utils";
import SettingsScreen from "./screens/SettingsScreen";

// TODO: use translations

const HomeStack = createStackNavigator(homeNavigationMap, homeNavigationConfig);
const AuthStack = createStackNavigator(authNavigationMap, authNavigationConfig);

const createLabel = (text, tintColor) => <Text style={{ textAlign: "center", color: tintColor, fontSize: 14, paddingBottom: 4 }}>{text}</Text>;
const createIcon = (iconName, tintColor) => <Icon name={iconName} color={tintColor} size={25}/>;

const AppTabs = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => createLabel(translate("TAB_home"), tintColor),
      tabBarIcon: ({ focused, tintColor }) => createIcon("home", tintColor),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => createLabel(translate("TAB_profile"), tintColor),
      tabBarIcon: ({ focused, tintColor }) => createIcon("person", tintColor),
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => createLabel(translate("TAB_settings"), tintColor),
      tabBarIcon: ({ focused, tintColor }) => createIcon("settings", tintColor),
    },
  },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarOptions: {
      activeBackgroundColor: Colors.colorPrimary,
      inactiveBackgroundColor: Colors.colorPrimary,
      activeTintColor: Colors.colorOnPrimary,
      inactiveTintColor: "gray",
    }
  })
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      App: AppTabs,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Splash",
    }
  )
);
