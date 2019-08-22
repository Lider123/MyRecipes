import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";

import Recipe from "../models/Recipe";
import Colors from "../config/Colors";
import translate from '../utils/language.utils';

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
};

RecipeCard.defaultProps = {
  style: {},
  onPress: () => {},
};

export default function RecipeCard({recipe, style, onPress}) {
  const ingredients = recipe.ingredients.map(i => i.name).join(", ");
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}>
      <Text style={styles.title}>{recipe.title}</Text>
      { recipe.photos.length > 0 &&
        <Image
          style={styles.photo}
          source={{ uri: "data:image/jpeg;base64," + recipe.photos[0] }}/>
      }
      <Text style={styles.text}>{translate('RECIPE_CARD_ingredients')}: { ingredients }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.colorSurface,
    padding: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  photo: {
    width: 200,
    height: 200,
    margin: 8,
    resizeMode: "cover",
  },
  text: {
    fontSize: 14,
  },
});