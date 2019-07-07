import React, {Component} from "react"
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"

import {Colors} from "../config";
import HeaderIcon from "../components/HeaderIcon";
import PhotoList from "../components/PhotoList";
import Api from "../network/Api";
import Recipe from "../models/Recipe";

export default class RecipeScreen extends Component {
  state = {
    recipe: new Recipe(),
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <HeaderIcon
            name="edit"
            onPress={ navigation.getParam("editRecipe") }/>
          <HeaderIcon
            name="delete"
            onPress={ navigation.getParam("deleteRecipe") }/>
        </View>
      ),
    };
  };

  componentDidMount() {
    this.setState({ recipe: this.props.navigation.state.params.recipe });
    this.props.navigation.setParams({
      deleteRecipe: this._showConfirmDialog,
      editRecipe: this._goEditRecipe,
    });
  }

  _showConfirmDialog = () => {
    Alert.alert(
      'Confirm deletion',
      'Are you sure you want to delete recipe?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: this._deleteRecipe
        },
      ],
      { cancelable: true },
    );
  };

  _goEditRecipe = () => {
    const {recipe} = this.state;
    this.props.navigation.navigate("CreateRecipe", {
      recipe: recipe,
      onSave: this._updateRecipe,
    });
  };

  _updateRecipe = (recipe) => {
    this.props.navigation.state.params.onUpdateRecipe(recipe);
    this.setState({recipe});
  };

  _deleteRecipe = () => {
    const {recipe} = this.state;
    const {onDeleteRecipe} = this.props.navigation.state.params;
    onDeleteRecipe(recipe.id);
    this.props.navigation.goBack();
    Api.deleteRecipe(recipe.id)
      .then(res => {
        console.log("Recipe " + recipe.id + " been deleted");
      })
      .catch(err => err);
  };

  render() {
    const {recipe} = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { textAlign: "center" }]}>{recipe.title}</Text>
        <ScrollView>

          { recipe.photos.length > 0 &&
            <PhotoList
              photos={recipe.photos}
              style={{ margin: 8 }}/>
          }

          <Text style={styles.title}>Ingredients:</Text>
          {
            recipe.ingredients.map((item, key) => (
              <Text
                style={styles.text}
                key={key}>&#183; { item.name }, { item.count }</Text>
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
    backgroundColor: Colors.colorBackground,
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
  text: {
    fontSize: 14,
    paddingLeft: 8,
    paddingRight: 8,
  },
});