import React from "react";
import {
  ColorPropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: ColorPropType,
  textColor: ColorPropType,
  onPress: PropTypes.func,
  style: PropTypes.style,
};

CustomButton.defaultProps = {
  color: "#444",
  textColor: "#FFF",
  onPress: () => {},
  style: {},
};

export default function CustomButton({ text, color, textColor, onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.container, style, { backgroundColor: color }]}
      onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  }
});