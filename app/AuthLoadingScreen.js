import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View
} from "react-native";
import TokenStore from "./tokenstore";
import Const from "./const";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await TokenStore.retrieveToken();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    let that = this;
    setTimeout(() => {
      that.props.navigation.navigate(userToken ? "App" : "Auth");
    }, 2000);
  };

  // Render any loading content that you like here
  render() {
    return (
      <ImageBackground source={{ uri: Const.GYY }} style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="tomato" />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
