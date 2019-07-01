import React, {Component} from "react"
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"

import Ingredient from "../models/Ingredient";

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
    const { recipe } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.header]}>{ recipe.title }</Text>

        <ScrollView>

          { recipe.photo !== "" &&
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                style={styles.photo}
                source={{uri: recipe.photo}}/>
            </View>
          }

          <Text style={styles.title}>Ingredients:</Text>
          {
            recipe.ingredients.map((item: Ingredient, key) => (
              <Text style={styles.text}>&#183; { item.name }, { item.count }</Text>
            ))
          }

          <Text style={styles.title}>Description</Text>
          <Text style={styles.text}>{ recipe.text }</Text>

        </ScrollView>

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
  photo: {
    width: 200,
    height: 200,
    margin: 8,
    resizeMode: "cover",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 8,
    paddingTop: 16,
  },
  header: {
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    paddingLeft: 8,
    paddingRight: 8,
  },
});