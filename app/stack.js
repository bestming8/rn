import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import SignUpScreen from "./signup";
import SignInScreen from "./login";
import SignInSMSScreen from "./loginsms";
import HomeScreen from "./Home";
import OtherScreen from "./Other";
import AppTab from "./appstack";
import AuthLoadingScreen from "./AuthLoadingScreen";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = AppTab;
const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    SignInSMS: SignInSMSScreen
  },
  {
    initialRouteName: "SignIn",
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
