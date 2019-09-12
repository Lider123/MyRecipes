import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../config/Colors";

CustomTextLink.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};

CustomTextLink.defaultProps = {
  onPress: () => {},
  style: {},
};

export default function CustomTextLink({ text, onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.colorAccent,
    textDecorationLine: 'underline',
    textAlign: "center",
  },
});
