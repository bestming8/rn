import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View } from "react-native";

var URL =
  "http://b-ssl.duitang.com/uploads/item/201704/18/20170418203815_WuymJ.jpeg";

var URL1 =
  "http://b-ssl.duitang.com/uploads/item/201704/23/20170423011218_sPMxy.jpeg";

var URL2 = "http://p0.qhimgs4.com/t01df2eaafe4c53b730.jpg";

var GYY =
  "https://05.imgmini.eastday.com/mobile/20170806/0d8e5eb74792cfa46350ea6a3e12a148.jpeg";

var LYF =
  "https://05.imgmini.eastday.com/mobile/20170806/3929e6d2ba76196cc06c4cae407787a3.jpeg";

var LSS =
  "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2434351706,3986093100&fm=175&s=EF66A5572D33C694286C58FE0300E060&w=640&h=824&img.JPEG";

let JXS =
  "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=a3e605776709c93d13ff06a5fe5493b9/d50735fae6cd7b89f4a075fa0f2442a7d8330efe.jpg";

export default class SampleAppMovies extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: LSS }} style={{ width: 400, height: 600 }} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  thumbnail: {
    width: 200,
    height: 200
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  year: {
    textAlign: "center"
  },

  rightContainer: {
    flex: 1
  }
});
