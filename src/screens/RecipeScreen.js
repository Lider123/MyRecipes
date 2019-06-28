import React, {Component} from "react"
import {
  StyleSheet,
  View
} from "react-native"

export default class RecipeScreen extends Component {
  static navigationOptions = {
    title: 'Recipe',
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
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#CCC"
  },
});