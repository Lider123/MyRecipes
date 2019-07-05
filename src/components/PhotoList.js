import React, {Component} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";

export default class PhotoList extends Component {
  static propTypes = {
    photos: PropTypes.array,
    style: ViewPropTypes.style,
    onAddPress: PropTypes.func,
  };

  static defaultProps = {
    photos: [],
    style: {},
    onAddPress: () => {},
  };

  _renderPhoto = function(photo, i) {
    return <Image
      key={i}
      style={styles.photo}
      source={{uri: "data:image/jpeg;base64," + photo}}/>
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={[styles.container, this.props.style]}
        horizontal={true}>
        <TouchableOpacity onPress={this.props.onAddPress}>
          <Image
            style={styles.photo}
            source={require("../../img/add-photo.png")}/>
        </TouchableOpacity>
        { this.props.photos.map(this._renderPhoto) }
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