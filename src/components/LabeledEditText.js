import React from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native"
import PropTypes from "prop-types"

LabeledEditText.propTypes = {
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  onChangeText: PropTypes.func,
};

LabeledEditText.defaultProps = {
  multiline: false,
  onChangeText: () => {},
};

export default function LabeledEditText({ label, multiline, onChangeText }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBackground}>
        <TextInput
          multiline={multiline}
          onChangeText={onChangeText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBackground: {
    backgroundColor: "#EEE",
    borderRadius: 4,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 8,
    paddingTop: 16,
  },
});