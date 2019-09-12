import React from "react";
import {
  StyleSheet,
  TextInput,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types"

CustomTextInput.propTypes = {
  value: PropTypes.string,
  hint: PropTypes.string,
  multiline: PropTypes.bool,
  onChangeText: PropTypes.func,
  style: ViewPropTypes.style,
};

CustomTextInput.defaultProps = {
  value: "",
  hint: "",
  multiline: false,
  onChangeText: () => {},
  style: {},
};

export default function CustomTextInput({ value, hint, multiline, onChangeText, style }) {
  return (
    <TextInput
      value={value}
      placeholder={hint}
      multiline={multiline}
      onChangeText={onChangeText}
      autoCapitalize='none'
      style={[styles.input, style]}/>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#EEE",
    borderRadius: 4,
    padding: 8,
  },
});
