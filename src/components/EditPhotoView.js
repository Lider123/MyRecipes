import React, {Component} from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

import FloatingActionButton from './FloatingActionButton';
import Colors from '../config/Colors';

export default class EditPhotoView extends Component {
  static propTypes = {
    photo: PropTypes.string,
    onAddPress: PropTypes.func,
    onEditPress: PropTypes.func,
    onRemovePress: PropTypes.func,
  };

  static defaultProps = {
    photo: "",
    onAddPress: () => {},
    onEditPress: () => {},
    onRemovePress: () => {},
  };

  render() {
    const {photo} = this.props;
    const gotImage = photo !== "";
    const src = gotImage ? {uri: `data:image/jpeg;base64,${photo}`} : require("../../img/add-photo.png");
    const photoStyle = {
      resizeMode: gotImage ? "cover" : "contain",
      alignSelf: gotImage? "stretch" : "center",
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={ gotImage ? this.props.onEditPress : this.props.onAddPress }>
        <Image
          style={[styles.photo, photoStyle]}
          source={src}/>
        { gotImage &&
        <FloatingActionButton
          onPress={this.props.onRemovePress}
          color={Colors.colorAccent}
          size={50}
          icon="delete"/>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  photo: {
    flex: 1,
    height: 200,
    backgroundColor: "#AAA",
  },
});
