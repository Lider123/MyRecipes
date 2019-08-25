import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons"

import Ingredient from "../models/Ingredient";
import translate from "../utils/language.utils";

IngredientEditor.propTypes = {
  ingredient: PropTypes.instanceOf(Ingredient).isRequired,
  onChangeName: PropTypes.func,
  onChangeCount: PropTypes.func,
  onClosePress: PropTypes.func,
};

IngredientEditor.defaultProps = {
  onChangeName: () => {},
  onChangeCount: () => {},
  onClosePress: null,
};

export default function IngredientEditor({ ingredient, onChangeName, onChangeCount, onClosePress }) {
  const closeButtonSize = 30;
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={translate("EDIT_INGREDIENT_placeholderName")}
        style={styles.inputBackground}
        onChangeText={ onChangeName }
        value={ingredient.name}/>
      <TextInput
        placeholder={translate("EDIT_INGREDIENT_placeholderCount")}
        style={styles.inputBackground}
        onChangeText={ onChangeCount }
        value={ingredient.count}/>
      { onClosePress &&
        <TouchableOpacity
          style={[styles.closeButton, { width: closeButtonSize, height: closeButtonSize }]}
          onPress={ onClosePress }>
          <Icon
            name="clear"
            size={ 0.8 * closeButtonSize }
            color="#FFF"/>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
    flexGrow: 1,
  },
  inputBackground: {
    backgroundColor: "#DDD",
    borderRadius: 4,
    marginLeft: 8,
    flexGrow: 1,
  },
  closeButton: {
    backgroundColor: "#F00",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
});