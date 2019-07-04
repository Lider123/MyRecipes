import React, {Component} from "react"
import {
  FlatList,
  StyleSheet,
  View
} from "react-native"

import getRecipes from "../helpers/RecipesHelper";
import FloatingActionButton from "../components/FloatingActionButton";
import {Colors} from "../config";
import RecipeCard from "../components/RecipeCard";

export default class RecipeListScreen extends Component {
  state = {
    recipes: getRecipes()
  };

  _keyExtractor = (item, key) => item.id;

  _onItemPress = item => {
    this.props.navigation.navigate("Recipe", { recipe: item });
  };

  _onFloatingButtonPress = () => {
    this.props.navigation.navigate("CreateRecipe", { onSave: this._handleCreateRecipe });
  };

  _handleCreateRecipe = recipe => {
    const {recipes} = this.state;
    recipes.push(recipe);
  };

  _renderItem = ({ item, index }) => {
    return RecipeCard({
      recipe: item,
      onPress: () => this._onItemPress(item),
      style: index === 0 ? { marginTop: 8 } : {}
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.recipes}
          extraData={this.state.recipes}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}/>
        <FloatingActionButton
          color={Colors.colorAccent}
          tintColor={Colors.colorOnAccent}
          onPress={this._onFloatingButtonPress}/>
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
    backgroundColor: Colors.colorBackground,
    paddingLeft: 8,
    paddingRight: 8,
  },
});