import React from "react"
import {
  StyleSheet,
  Text,
  View
} from "react-native"
import PropTypes from "prop-types"
import CustomTextInput from "./CustomTextInput";

LabeledTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  multiline: PropTypes.bool,
  onChangeText: PropTypes.func,
};

LabeledTextInput.defaultProps = {
  value: "",
  multiline: false,
  onChangeText: () => {},
};

export default function LabeledTextInput({ label, value, multiline, onChangeText }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <CustomTextInput
        value={value}
        multiline={multiline}
        onChangeText={onChangeText}/>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
});
