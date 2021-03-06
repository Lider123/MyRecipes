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
  feedNavigationConfig,
  feedNavigationMap,
  homeNavigationConfig,
  homeNavigationMap,
  settingsNavigationConfig,
  settingsNavigationMap
} from "./navigation";
import SplashScreen from "./screens/SplashScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Colors from "./config/Colors";
import translate from "./utils/language.utils";

const HomeStack = createStackNavigator(homeNavigationMap, homeNavigationConfig);
const FeedStack = createStackNavigator(feedNavigationMap, feedNavigationConfig);
const SettingsStack = createStackNavigator(settingsNavigationMap, settingsNavigationConfig);
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
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: ({ focused, tintColor }) => createLabel(translate("TAB_feed"), tintColor),
      tabBarIcon: ({ focused, tintColor }) => createIcon("store", tintColor),
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
    screen: SettingsStack,
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
