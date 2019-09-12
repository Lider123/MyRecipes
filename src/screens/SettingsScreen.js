import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import Colors from "../config/Colors";

export default class SettingsScreen extends Component {

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text>TODO: settings</Text>
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
