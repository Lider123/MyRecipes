import React, {Component} from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"
import firebase from "react-native-firebase";
import { Snackbar } from 'react-native-paper';

import Colors from "../config/Colors";
import translate from "../utils/language.utils"

export default class SettingsScreen extends Component {
  state = {
    settings: [],
    snackbarVisible: false,
    snackbarText: "",
  };

  componentDidMount() {
    const settings = [
      {
        title: translate("SETTINGS_SCREEN_logOut"),
        onPress: this._showLogOutAlert,
      }
    ];
    this.setState({settings})
  }

  _showSnackbar = (text) => {
    this.setState({ snackbarText: text, snackbarVisible: true });
    setTimeout(() => {this.setState({ snackbarVisible: false })}, 2500);
  };

  _showLogOutAlert = () => {
    Alert.alert(
      translate("SETTINGS_SCREEN_logOut"),
      translate("SETTINGS_SCREEN_logOutConfirmMessage"),
      [
        {
          text: translate("no"),
          style: "cancel",
        },
        {
          text: translate("yes"),
          onPress: this._logOut
        }
      ]
    );
  };

  _logOut = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Auth");
      })
      .catch((error) => {
        this._showSnackbar(translate("SETTINGS_SCREEN_logOutError"))
      })
  };

  _renderSettingsItem = (item, index) => (
    <TouchableOpacity
      onPress={item.onPress}
      key={"settingsItem" + index}>
      <View style={styles.settingsItemContainer}>
        <Text style={styles.settingsItemTitle}>{item.title}</Text>
        <Icon name="chevron-right" color="gray" size={25}/>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { settings, snackbarVisible, snackbarText } = this.state;
    return (
      <View style={styles.container}>
        {settings.map((item, index) => this._renderSettingsItem(item, index))}
        <Snackbar
          visible={snackbarVisible}
        style={styles.snackbar}>{snackbarText}</Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingStart: 16,
    paddingEnd: 16,
    backgroundColor: Colors.colorBackground,
  },
  settingsItemContainer: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  settingsItemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  snackbar: {
    backgroundColor: Colors.colorError,
  }
});
