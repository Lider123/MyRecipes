import React, {Component} from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet, Text,
  View
} from "react-native";
import firebase from "react-native-firebase";

import CustomButton from "../components/CustomButton";
import Colors from "../config/Colors";
import CustomTextLink from "../components/CustomTextLink";
import translate from "../utils/language.utils";
import CustomInputField from "../components/CustomInputField";

export default class LogInScreen extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    errorVisible: false,
    progressVisible: false,
  };

  _logIn = () => {
    this.setState({ errorVisible: false, progressVisible: true });
    if (!this._inputIsValid())
      return;

    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ progressVisible: false });
        this.props.navigation.navigate("App");
      })
      .catch(error => this.setState({
        errorMessage: error.message,
        errorVisible: true,
        progressVisible: false,
      }));
  };

  _inputIsValid() {
    const { email, password } = this.state;
    if ([email, password].some(x => "" === x)) {
      this.setState({
        errorMessage: translate("LOGIN_SCREEN_someFieldsAreEmpty"),
        errorVisible: true,
        progressVisible: false,
      });
      return false;
    }
    return true;
  }

  _goToSignUp = () => {
    this.props.navigation.navigate("SignUp")
  };

  render() {
    const { email, password, errorMessage, errorVisible, progressVisible } = this.state;
    const inputBlock = (
      <View>
        <CustomInputField
          value={email}
          hint={translate("LOGIN_SCREEN_emailHint")}
          onEmptyMessage={translate("LOGIN_SCREEN_emailIsEmpty")}
          onChangeText={ (text) => this.setState({ email: text, errorVisible: false }) }
          style={styles.input}/>
        <CustomInputField
          value={password}
          hint={translate("LOGIN_SCREEN_passwordHint")}
          onEmptyMessage={translate("LOGIN_SCREEN_passwordIsEmpty")}
          onChangeText={ (text) => this.setState({ password: text, errorVisible: false }) }
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
          <View>
            <CustomButton
              text={translate("LOGIN_SCREEN_logInButton")}
              color={Colors.colorAccent}
              textColor={Colors.colorOnAccent}
              onPress={this._logIn}/>
            <CustomTextLink
              style={styles.action}
              text={translate("LOGIN_SCREEN_signUpLink")}
              onPress={this._goToSignUp}/>
          </View>
        )}
      </View>
    );
    return (
      <View style={styles.container}>
        <Image
          source={require("../../img/icon.png")}
          style={styles.logo}/>
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
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
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
