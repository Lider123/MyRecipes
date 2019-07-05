import React, {Component} from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import LabeledEditText from "../components/LabeledEditText";
import Ingredient from "../models/Ingredient";
import Recipe from "../models/Recipe";
import {Colors} from "../config";
import CustomButton from "../components/CustomButton";
import IngredientEditor from "../components/IngredientEditor";
import PhotoList from "../components/PhotoList";
import ImagePicker from "react-native-image-picker";
import Api from "../network/Api";

const imagePickerOptions = {
  title: 'Select photo',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.9,
  allowsEditing: true,
};

export default class CreateRecipeScreen extends Component {
  state = {
    title: "",
    photos: [],
    ingredients: [],
    description: "",
  };

  _keyExtractor = (item, key) => item.id;

  _setTitle = text => {
    this.setState({ title: text });
  };

  _setDescription = text => {
    this.setState({ description: text });
  };

  _addPhoto = () => {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.error)
        console.log('ImagePicker Error: ', response.error);
      else {
        const {photos} = this.state;
        this.setState({ photos: [...photos, response.data] });
      }
    });
  };

  _addIngredient = () => {
    const {ingredients} = this.state;
    this.setState({ ingredients: [...ingredients, new Ingredient("", "")] });
  };

  _removeIngredient = id => {
    const {ingredients} = this.state;
    const filtered = ingredients.filter(value => value.id !== id);
    this.setState({ ingredients: [...filtered] });
  };

  _setIngredientName = ({ id, text }) => {
    const {ingredients} = this.state;
    ingredients.find(value => value.id === id)._name = text;
    this.setState({ ingredients: [...ingredients] });
  };

  _setIngredientCount = ({ id, text }) => {
    const {ingredients} = this.state;
    ingredients.find(value => value.id === id)._count = text;
    this.setState({ ingredients: [...ingredients] });
  };

  _onSave = () => {
    const { title, photos, ingredients, description } = this.state;
    const recipe = new Recipe();
    recipe.title = title;
    recipe.photos = photos;
    recipe.ingredients = ingredients;
    recipe.text = description;
    this.props.navigation.state.params.onSave(recipe);
    this.props.navigation.goBack();
    Api.putRecipe(recipe)
      .then(res => {
        console.log("Recipe has been created");
      })
      .catch(err => err);
  };

  _renderItem = ({item}) => {
    const id = item.id;
    return <IngredientEditor
      ingredient={item}
      onChangeName={ (text) => this._setIngredientName({ id, text }) }
      onChangeCount={ (text) => this._setIngredientCount({ id, text }) }
      onClosePress={ () => this._removeIngredient(id) }
    />
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <LabeledEditText
          label="Title"
          onChangeText={this._setTitle}/>

        <PhotoList
          photos={this.state.photos}
          style={{ marginTop: 16 }}
          hasAddButton={true}
          onAddPress={this._addPhoto}/>

        <View style={styles.ingredientsContainer}>
          <CustomButton
            text="Add ingredient"
            color={Colors.colorAccent}
            textColor={Colors.colorOnAccent}
            onPress={this._addIngredient}/>
          <FlatList
            data={this.state.ingredients}
            extraData={this.state.ingredients}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}/>
        </View>

        <LabeledEditText
          label="Description"
          multiline={true}
          onChangeText={this._setDescription}/>

        <CustomButton
          text="Save"
          color={Colors.colorAccent}
          textColor={Colors.colorOnAccent}
          onPress={this._onSave}
          style={{ marginTop: 16 }}/>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  ingredientsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 16,
  },
});