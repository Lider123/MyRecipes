import React from "react";
import {
  ColorPropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

FloatingActionButton.propTypes = {
  color: ColorPropType,
  tintColor: ColorPropType,
  onPress: PropTypes.func,
  size: PropTypes.number,
};

FloatingActionButton.defaultProps = {
  color: "#444",
  tintColor: "#FFF",
  size: 60,
  onPress: () => {},
};

export default function FloatingActionButton({ color, tintColor, onPress, size }) {
  const buttonStyle = {
    width: size,
    height: size,
    borderRadius: 0.5 * size,
    backgroundColor: color,
  };
  return (
    <TouchableOpacity
      style={[styles.container, buttonStyle]}
      onPress={onPress}>
      <Icon
        name="add"
        color={tintColor}
        size={ 0.8 * size }/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 24,
    right: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});