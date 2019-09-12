import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import firebase from "react-native-firebase";

import Colors from "../config/Colors";

export default class ProfileScreen extends Component {

  render() {
    const username = firebase.auth().currentUser.displayName;
    return (
      <View style={styles.container}>
        <Text>I am {username}</Text>
        <Text>TODO: profile</Text>
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
    backgroundColor: Colors.colorBackground,
  },
});
