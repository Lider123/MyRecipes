import React, {Component} from "react";
import {
  Image,
  StyleSheet,
  View
} from "react-native";
import firebase from "react-native-firebase";

import Colors from "../config/Colors";

export default class SplashScreen extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user)
        this._goToApp();
      else
        setTimeout(this._goToAuth, 2500);
    });
  }

  _goToApp = () => {
    this.props.navigation.navigate("App")
  };

  _goToAuth = () => {
    this.props.navigation.navigate("Auth")
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../img/icon.png")}
          style={styles.logo}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.colorPrimary,
    padding: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
});
