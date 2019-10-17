import React, {Component} from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import firebase from "react-native-firebase";

import LabeledTextInput from "../components/LabeledTextInput";
import Ingredient from "../models/Ingredient";
import CustomButton from "../components/CustomButton";
import IngredientEditor from "../components/IngredientEditor";
import ImagePicker from "react-native-image-picker";
import Api from "../network/Api";
import Colors from "../config/Colors";
import translate from "../utils/language.utils";
import EditPhotoView from '../components/EditPhotoView';
import PhotoList from '../components/PhotoList';

const imagePickerOptions = {
  title: translate("PHOTO_DIALOG_selectPhoto"),
  cancelButtonTitle: translate("PHOTO_DIALOG_cancel"),
  takePhotoButtonTitle: translate("PHOTO_DIALOG_takePhoto"),
  chooseFromLibraryButtonTitle: translate("PHOTO_DIALOG_chooseFromLibrary"),
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.9,
  allowsEditing: true,
};

export default class EditRecipeScreen extends Component {
  state = {
    title: "",
    photo: "",
    ingredients: [],
    description: "",
  };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params && state.params.title ? state.params.title : translate("EDIT_RECIPE_SCREEN_title")}`,
    };
  };

  componentDidMount() {
    const recipe = this.props.navigation.state.params.recipe;
    this.setState({
      title: recipe.title,
      photo: recipe.photo,
      ingredients: recipe.ingredients,
      description: recipe.text,
    });
  }

  _keyExtractor = (item, key) => item.id;

  _setTitle = text => {
    this.setState({ title: text });
  };

  _setDescription = text => {
    this.setState({ description: text });
  };

  _addPhoto = () => {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel)
        return;
      if (response.error)
        console.log('ImagePicker Error: ', response.error);
      else
        this.setState({ photo: response.data });
    });
  };

  _removePhoto = () => {
    this.setState({ photo: "" });
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
    ingredients.find(value => value.id === id).name = text;
    this.setState({ ingredients: [...ingredients] });
  };

  _setIngredientCount = ({ id, text }) => {
    const {ingredients} = this.state;
    ingredients.find(value => value.id === id).count = text;
    this.setState({ ingredients: [...ingredients] });
  };

  _inputIsValid() {
    if (this.state.title.length < 1) {
      ToastAndroid.show(translate("EDIT_RECIPE_SCREEN_titleIsEmpty"), ToastAndroid.SHORT, ToastAndroid.CENTER);
      return false;
    }
    if (this.state.ingredients.some(item => item.name.length < 1 || item.count.length < 1)) {
      ToastAndroid.show(translate("EDIT_RECIPE_SCREEN_ingredientsAreEmpty"), ToastAndroid.SHORT, ToastAndroid.CENTER);
      return false;
    }
    if (this.state.description.length < 1) {
      ToastAndroid.show(translate("EDIT_RECIPE_SCREEN_descriptionIsEmpty"), ToastAndroid.SHORT, ToastAndroid.CENTER);
      return false;
    }
    return true;
  }

  _onSave = () => {
    if (!this._inputIsValid())
      return;
    const { title, photo, ingredients, description } = this.state;
    const recipe = this.props.navigation.state.params.recipe;
    recipe.title = title;
    recipe.photo = photo;
    recipe.ingredients = ingredients;
    recipe.text = description;
    recipe.author = firebase.auth().currentUser.email;
    recipe.updatedAt = Date.now();
    this.props.navigation.state.params.onSave(recipe);
    this.props.navigation.goBack();
    Api.createOrUpdateRecipe(recipe)
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

        <EditPhotoView
          photo={this.state.photo}
          onAddPress={this._addPhoto}
          onEditPress={this._addPhoto}
          onRemovePress={this._removePhoto}/>

        <View style={styles.mainContent}>

          <LabeledTextInput
            label={translate("EDIT_RECIPE_SCREEN_labelTitle")}
            value={this.state.title}
            onChangeText={this._setTitle}/>

          <View style={styles.ingredientsContainer}>
            <FlatList
              data={this.state.ingredients}
              extraData={this.state.ingredients}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
            <CustomButton
              text={translate("EDIT_RECIPE_SCREEN_labelAddIngredient")}
              color={Colors.colorAccent}
              textColor={Colors.colorOnAccent}
              onPress={this._addIngredient}/>
          </View>

          <LabeledTextInput
            label={translate("EDIT_RECIPE_SCREEN_labelDescription")}
            value={this.state.description}
            multiline={true}
            onChangeText={this._setDescription}/>

          <CustomButton
            text={translate("EDIT_RECIPE_SCREEN_buttonSave")}
            color={Colors.colorAccent}
            textColor={Colors.colorOnAccent}
            onPress={this._onSave}
            style={{ marginTop: 16 }}/>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  mainContent: {
    paddingStart: 16,
    paddingEnd: 16
  },
  ingredientsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 16,
  },
});