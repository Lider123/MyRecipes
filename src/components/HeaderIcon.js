import React from "react";
import {
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"
import PropTypes from "prop-types";
import Colors from "../config/Colors";

HeaderIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

HeaderIcon.defaultProps = {
  onPress: () => {},
};

export default function HeaderIcon({ name, onPress }) {
  const size = 26;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <Icon
        name={name}
        color={Colors.colorOnPrimary}
        size={size}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});