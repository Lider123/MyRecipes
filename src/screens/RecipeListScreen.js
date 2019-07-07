import React, {Component} from "react"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View
} from "react-native"
import FloatingActionButton from "../components/FloatingActionButton";
import {Colors} from "../config";
import RecipeCard from "../components/RecipeCard";
import Api from "../network/Api";
import * as Parsers from "../network/Deserializers";
import Recipe from "../models/Recipe";

export default class RecipeListScreen extends Component {
  state = {
    recipes: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    Api.getRecipes()
      .then((responseJson) => {
        const recipes = Parsers.deserializeRecipes(responseJson);
        this.setState({
          recipes: recipes,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false });
      });
  }

  _keyExtractor = (item, key) => item.id;

  _onItemPress = item => {
    this.props.navigation.navigate("Recipe", {
      recipe: item,
      onDeleteRecipe: this._handleDeleteRecipe,
      onUpdateRecipe: this._handleUpdateRecipe,
    });
  };

  _onFloatingButtonPress = () => {
    this.props.navigation.navigate("CreateRecipe", {
      recipe: new Recipe(),
      onSave: this._handleCreateRecipe
    });
  };

  _handleCreateRecipe = recipe => {
    const {recipes} = this.state;
    recipes.push(recipe);
    this.setState({ recipes: [...recipes] });
  };

  _handleUpdateRecipe = recipe => {
    const {recipes} = this.state;
    recipes.map(value => {
      if (value.id === recipe.id)
        return recipe;
    });
    this.setState({ recipes: [...recipes] });
  };

  _handleDeleteRecipe = id => {
    const {recipes} = this.state;
    const filtered = recipes.filter(value => value.id !== id);
    this.setState({ recipes: filtered });
  };

  _renderItem = ({ item, index }) => {
    return RecipeCard({
      recipe: item,
      onPress: () => this._onItemPress(item),
      style: index === 0 ? { marginTop: 8 } : {},
    });
  };

  render() {
    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color={Colors.colorAccent}/>
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.recipes}
            extraData={this.state.recipes}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}/>
          <FloatingActionButton
            icon="add"
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