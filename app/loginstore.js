import { AsyncStorage } from "react-native";

exports.savePhoneNum = number => {
  return AsyncStorage.setItem("number", number);
};

exports.retrievePhoneNum = () => {
  return AsyncStorage.getItem("number");
};

exports.savePassword = number => {
  return AsyncStorage.setItem("password", number);
};

exports.retrievePassword = () => {
  return AsyncStorage.getItem("password");
};
