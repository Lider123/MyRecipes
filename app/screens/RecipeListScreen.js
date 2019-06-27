import React, {Component} from "react"
import {FlatList, Text, StyleSheet, View} from "react-native"
import getRecipes from "../helpers/RecipesHelper";

export default class RecipeListScreen extends Component {
  state = {
    recipes: getRecipes()
  };

  _keyExtractor = item => item.id;

  _renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCC',
  },
  item: {
    borderRadius: 45,
    backgroundColor: "#FFF",
    padding: 8,
    margin: 8,
  }
});