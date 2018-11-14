import { AsyncStorage } from "react-native";

exports.saveToken = token => {
  return AsyncStorage.setItem("token", token);
};

exports.retrieveToken = () => {
  return AsyncStorage.getItem("token");
};
