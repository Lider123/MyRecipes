import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";

import Recipe from "../models/Recipe";
import Colors from "../config/Colors";

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
      { recipe.photo !== "" &&
        <Image
          style={styles.photo}
          source={{ uri: "data:image/jpeg;base64," + recipe.photo }}/>
      }
      <View style={styles.info_container}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text
          ellipsizeMode="tail"
          style={styles.text}>{ ingredients }</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    flex: 1,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: Colors.colorSurface,
    elevation: 1,
  },
  photo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 4,
    resizeMode: "cover",
  },
  info_container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: 1,
  },
  title: {
    paddingTop: 8,
    paddingStart: 8,
    paddingEnd: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    opacity: .54,
  },
});