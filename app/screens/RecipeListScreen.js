import React, {Component} from "react"
import {FlatList, Image, Text, StyleSheet, ToolbarAndroid, View} from "react-native"
import getRecipes from "../helpers/RecipesHelper";

export default class RecipeListScreen extends Component {
  state = {
    recipes: getRecipes()
  };

  _keyExtractor = item => item.id;

  _renderItem = ({item, index}) => {
    let ingredients = item.ingredients.map(i => i.name).join(", ");
    return (
      <View style={[styles.item, index === 0 ? {marginTop: 8} : {}]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          style={styles.photo}
          source={{uri: item.photo}}/>
        <Text style={styles.text}>Ingredients: {ingredients}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          titleColor="#FFF"
          title="MyRecipes"
          style={styles.toolbar}/>
        <FlatList
          style={styles.list}
          data={this.state.recipes}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#590e0a",
    height: 56,
    alignSelf: "stretch",
    textAlign: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#CCC",
  },
  list: {
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