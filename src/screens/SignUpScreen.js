import React, {Component} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from "react-native";
import firebase from "react-native-firebase";

import CustomButton from "../components/CustomButton";
import Colors from "../config/Colors";
import translate from "../utils/language.utils";
import CustomInputField from "../components/CustomInputField";
import User from "../models/User";
import Api from "../network/Api";

export default class SignUpScreen extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    errorMessage: "",
    errorVisible: false,
    progressVisible: false,
  };

  _onSubmit = () => {
    this.setState({ errorVisible: false, progressVisible: true });
    if (!this._inputIsValid())
      return;

    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const user = firebase.auth().currentUser;
        return user.updateProfile({
          displayName: this.state.username,
        });
      })
      .then(() => {
        this.setState({ progressVisible: false });
        const user = new User();
        return Api.createOrUpdateUser(user);
      })
      .then(() => {
        this.props.navigation.navigate("App")
      })
      .catch(error => this.setState({
        errorMessage: error.message,
        errorVisible: true,
        progressVisible: false,
      }));
  };

  _inputIsValid() {
    const { username, email, password, passwordConfirm } = this.state;
    if ([username, email, password, passwordConfirm].some(x => "" === x)) {
      this.setState({
        errorMessage: translate("SIGNUP_SCREEN_someFieldsAreEmpty"),
        errorVisible: true,
        progressVisible: false,
      });
      return false;
    }
    if (password !== passwordConfirm) {
      this.setState({
        errorMessage: translate("SIGNUP_SCREEN_passwordsAreNotEqual"),
        errorVisible: true,
      });
      return false;
    }
    return true;
  }

  render() {
    const { username, email, password, passwordConfirm, errorMessage, errorVisible, progressVisible } = this.state;
    const inputBlock = (
      <View>
        <CustomInputField
          value={username}
          hint={translate("SIGNUP_SCREEN_usernameHint")}
          onEmptyMessage={translate("SIGNUP_SCREEN_usernameIsEmpty")}
          onChangeText={ (text) => this.setState({ username: text, errorVisible: false }) }
          style={styles.input}/>
        <CustomInputField
          value={email}
          hint={translate("SIGNUP_SCREEN_emailHint")}
          onEmptyMessage={translate("SIGNUP_SCREEN_emailIsEmpty")}
          onChangeText={ (text) => this.setState({ email: text, errorVisible: false }) }
          style={styles.input}/>
        <CustomInputField
          value={password}
          hint={translate("SIGNUP_SCREEN_passwordHint")}
          onEmptyMessage={translate("SIGNUP_SCREEN_passwordIsEmpty")}
          onChangeText={ (text) => this.setState({ password: text, errorVisible: false }) }
          secureTextEntry={true}
          style={styles.input}/>
        <CustomInputField
          value={passwordConfirm}
          hint={translate("SIGNUP_SCREEN_passwordConfirmHint")}
          onEmptyMessage={translate("SIGNUP_SCREEN_passwordConfirmIsEmpty")}
          onChangeText={ (text) => this.setState({ passwordConfirm: text, errorVisible: false }) }
          secureTextEntry={true}
          style={styles.input}/>
      </View>
    );
    const actionBlock = (
      <View>
        { errorVisible &&
          <Text style={styles.error}>{errorMessage}</Text>
        }
        { progressVisible ? (
          <ActivityIndicator
            size="large"
            color={Colors.colorAccent}/>
        ) : (
          <CustomButton
            text={translate("SIGNUP_SCREEN_signUpButton")}
            color={Colors.colorAccent}
            textColor={Colors.colorOnAccent}
            onPress={this._onSubmit}
            style={styles.action}/>
        )}
      </View>
    );
    return (
      <View style={styles.container}>
        {inputBlock}
        {actionBlock}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: Colors.colorPrimary,
    paddingStart: 32,
    paddingEnd: 32,
  },
  input: {
    marginTop: 16,
  },
  action: {
    marginTop: 16,
  },
  error: {
    marginTop: 16,
    marginBottom: 4,
    color: Colors.colorError,
    textAlign: "center",
  },
});
