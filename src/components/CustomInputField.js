import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types"
import Colors from "../config/Colors";

export default class CustomInputField extends Component {
  state = {
    errorVisible: false,
  };

  static propTypes = {
    value: PropTypes.string,
    hint: PropTypes.string,
    onEmptyMessage: PropTypes.string,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    value: "",
    hint: "",
    onEmptyMessage: "",
    onChangeText: (text) => {},
    secureTextEntry: false,
    style: {},
  };

  _onChangeText = (text) => {
    this.props.onChangeText(text);
    if (text === "")
      this.setState({ errorVisible: true });
    else
      this.setState({ errorVisible: false });
  };

  render() {
    const { value, hint, onEmptyMessage, secureTextEntry, style } = this.props;
    const { errorVisible } = this.state;
    return (
      <View style={style}>
        <TextInput
          value={value}
          placeholder={hint}
          onChangeText={this._onChangeText}
          autoCapitalize='none'
          secureTextEntry={secureTextEntry}
          style={styles.input}/>
        { errorVisible &&
          <Text style={styles.error}>{onEmptyMessage}</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#EEE",
    borderRadius: 4,
    padding: 8,
  },
  error: {
    color: Colors.colorError,
  },
});
