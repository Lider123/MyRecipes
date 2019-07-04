import { createStackNavigator, createAppContainer } from "react-navigation";

import {navigationConfig, navigationMap} from "./navigation";

const AppNavigator = createStackNavigator(navigationMap, navigationConfig);

export default createAppContainer(AppNavigator);
