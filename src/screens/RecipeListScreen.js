import React, {Component} from "react"
import {FlatList, Image, Text, StyleSheet, TouchableOpacity, View} from "react-native"
import getRecipes from "../helpers/RecipesHelper";

export default class RecipeListScreen extends Component {
  static navigationOptions = {
    title: 'Recipes',
    headerStyle: {
      backgroundColor: '#590e0a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    recipes: getRecipes()
  };

  _keyExtractor = item => item.id;

  _onItemPress = () => {
    this.props.navigation.navigate("Recipe");
  };

  _renderItem = ({item, index}) => {
    let ingredients = item.ingredients.map(i => i.name).join(", ");
    return (
      <TouchableOpacity
        style={[styles.item, index === 0 ? {marginTop: 8} : {}]}
        onPress={this._onItemPress}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          style={styles.photo}
          source={{uri: item.photo}}/>
        <Text style={styles.text}>Ingredients: {ingredients}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.recipes}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#CCC",
    paddingLeft: 8,
    paddingRight: 8,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFF",
    padding: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  text: {
    fontSize: 14,
  },
  photo: {
    width: 200,
    height: 200,
    margin: 8,
    resizeMode: "cover",
  }
});