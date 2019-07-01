import React, {Component} from "react";
import { View } from "react-native";

export default class CreateRecipeScreen extends Component {
  static navigationOptions = {
    title: 'New recipe',
    headerStyle: {
      backgroundColor: '#590e0a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View>

      </View>
    );
  }
}