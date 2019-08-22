import React, {Component} from "react"
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"

import HeaderIcon from "../components/HeaderIcon";
import PhotoList from "../components/PhotoList";
import Api from "../network/Api";
import Recipe from "../models/Recipe";
import Colors from "../config/Colors";
import translate from "../utils/language.utils"

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
      translate("RECIPE_SCREEN_deleteDialogTitle"),
      translate("RECIPE_SCREEN_deleteDialogMessage"),
      [
        {
          text: translate("RECIPE_SCREEN_deleteDialogNegative"),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: translate("RECIPE_SCREEN_deleteDialogPositive"),
          onPress: this._deleteRecipe
        },
      ],
      { cancelable: true },
    );
  };

  _goEditRecipe = () => {
    const {recipe} = this.state;
    this.props.navigation.navigate("EditRecipe", {
      title: translate("RECIPE_SCREEN_editRecipeTitle"),
      recipe: recipe,
      onSave: this._updateRecipe,
    });
  };

  _updateRecipe = (recipe) => {
    const {onUpdateRecipe} = this.props.navigation.state.params;
    onUpdateRecipe(recipe);
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

          <Text style={styles.title}>{translate("RECIPE_SCREEN_ingredients")}:</Text>
          {
            recipe.ingredients.map((item, key) => (
              <Text
                style={styles.text}
                key={key}>&#183; { item.name }, { item.count }</Text>
            ))
          }

          <Text style={styles.title}>{translate("RECIPE_SCREEN_description")}</Text>
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