import React, {Component} from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet
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

  _renderItem = ({ item, index }) => {
    return <Image
      style={styles.photo}
      source={{uri: item}}/>
  };

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.container, this.props.style]}>
        { this.props.photo &&
          <FlatList
            data={this.props.photos}
            extraData={this.props.photos}
            renderItem={this._renderItem}/>
        }
        <Image
          style={styles.photo}
          source={require("../../img/add-photo.png")}/>
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