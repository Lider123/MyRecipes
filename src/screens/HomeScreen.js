import React, {Component} from "react"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View
} from "react-native";
import firebase from "react-native-firebase";

import RecipeCard from "../components/RecipeCard";
import Api from "../network/Api";
import * as Parsers from "../network/Deserializers";
import Recipe from "../models/Recipe";
import Colors from "../config/Colors";
import translate from "../utils/language.utils";
import HeaderIcon from '../components/HeaderIcon';
import User from "../models/User";

export default class HomeScreen extends Component {
  state = {
    recipes: [],
    isLoading: false,
    userInfo: User(),
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <HeaderIcon
            name="add"
            onPress={navigation.getParam("addNewRecipe")}/>
        </View>
      ),
    };
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.navigation.setParams({
      addNewRecipe: this._addNewRecipe,
    });
    const author = firebase.auth().currentUser.email;
    Api.getUser(author)
      .then((responseJson) => {
        const userInfo = Parsers.deserializeUser(responseJson);
        this.setState({userInfo});
        return Api.getRecipesByAuthor(author);
      })
      .then((responseJson) => {
        const recipes = Parsers.deserializeRecipes({ documents: responseJson });
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
      title: item.title,
      recipe: item,
      onDeleteRecipe: this._handleDeleteRecipe,
      onUpdateRecipe: this._handleUpdateRecipe,
    });
  };

  _addNewRecipe = () => {
    this.props.navigation.navigate("EditRecipe", {
      title: translate("HOME_SCREEN_newRecipe"),
      recipe: new Recipe(),
      onSave: this._handleCreateRecipe
    });
  };

  _handleCreateRecipe = recipe => {
    const {recipes} = this.state;
    let inserted = false;
    for (let i = 0, len = recipes.length; i < len; i++) {
      if (recipe.title.toLowerCase() < recipes[i].title.toLowerCase()) {
        recipes.splice(i, 0, recipe);
        inserted = true;
        break;
      }
    }
    if (!inserted)
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
    const favourites = this.state.userInfo.favourites.map(f => f.trim());
    return RecipeCard({
      recipe: item,
      onPress: () => this._onItemPress(item),
      isFavourite: favourites.includes(item.id),
      style: index === 0 ? { marginTop: 16} : {},
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
            keyExtractor={this._keyExtractor}
            style={styles.list}/>
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
  },
  list: {
    paddingStart: 16,
    paddingEnd: 16
  },
});
