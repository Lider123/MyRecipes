import React, {Component} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

export default class PhotoList extends Component {
  static propTypes = {
    photos: PropTypes.array,
    style: PropTypes.style,
  };

  static defaultProps = {
    photos: [],
    style: {},
  };

  _renderPhoto = photo => {
    return <Image
      style={styles.photo}
      source={{uri: photo}}/>
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={[styles.container, this.props.style]}
        horizontal={true}>
        <Image
          style={styles.photo}
          source={require("../../img/add-photo.png")}/>
        { this.props.photos.map(item => this._renderPhoto(item)) }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  photo: {
    backgroundColor: "#AAA",
    width: 150,
    height: 150,
    resizeMode: "cover",
    margin: 2,
  },
});