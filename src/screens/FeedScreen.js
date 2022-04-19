import React, {Component} from "react"
import {
  FlatList,
  StyleSheet,
  View
} from "react-native";

import RecipeCard from "../components/RecipeCard";
import Api from "../network/Api";
import * as Parsers from "../network/Deserializers";
import Recipe from "../models/Recipe";
import Colors from "../config/Colors";

export default class FeedScreen extends Component {
  state = {
    recipes: [],
    isLoading: false,
  };

  componentDidMount() {
    this.loadFeed()
  }

  loadFeed() {
    this.setState({ isLoading: true });
    Api.getFeed()
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
    });
  };

  _renderItem = ({ item, index }) => {
    return RecipeCard({
      recipe: item,
      onPress: () => this._onItemPress(item),
      style: index === 0 ? { marginTop: 16 } : {},
    });
  };

  _onRefresh() {
    this.loadFeed()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.recipes}
          extraData={this.state.recipes}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          onRefresh={this._onRefresh}
          refreshing={this.state.isLoading}
          contentContainerStyle={styles.list}/>
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
