import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Card, WhiteSpace, WingBlank } from "antd-mobile-rn";

import Ionicons from "react-native-vector-icons/Ionicons";
import QRCode from "react-native-qrcode";
// import { QRScannerView } from "ac-qrcode-scanner-rn";
import Scanner from "./ScannerScreen";
import api from "./api/api";

{
  /*  */
}

function Device(productKey, deviceName, deviceId, deviceSecret) {
  this.productKey = productKey;
  this.deviceName = deviceName;
  this.deviceId = deviceId;
  this.deviceSecret = deviceSecret;
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [
        new Device("pk-1", "afa-1", "id-1", "secret-1"),
        new Device("pk-1", "afd-1", "id-1", "secret-1"),
        new Device("pk-1", "ca-1", "id-1", "secret-1")
      ]
    };

    // api.getDevices().then(data => {
    //   // this.setState({
    //   //   ...this.state,
    //   //   devices: this.devices.push(data)
    //   // });
    // });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.devices}
          renderItem={device => {
            return (
              <Card>
                <Card.Header
                  title={device.item.deviceName}
                  thumbStyle={{ width: 30, height: 30 }}
                  thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                  extra={device.item.productKey}
                />
                <Card.Body>
                  <View style={{ height: 42 }}>
                    <Text style={{ marginLeft: 16 }}>
                      {JSON.stringify(device)}
                    </Text>
                  </View>
                </Card.Body>
                <Card.Footer
                  content="footer content"
                  extra="footer extra content"
                />
              </Card>
            );
          }}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>设置!</Text>
      </View>
    );
  }
}

class NotificationScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>通知!</Text>
      </View>
    );
  }
}

const TabStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Notification: NotificationScreen,
    Settings: SettingsScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home${focused ? "" : ""}`;
        } else if (routeName === "Settings") {
          iconName = `ios-settings${focused ? "" : ""}`;
        } else if (routeName === "Notification") {
          iconName = `ios-notifications${focused ? "" : ""}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

export default createStackNavigator(
  {
    Front: TabStack,
    Scanner: Scanner
  },
  {
    initialRouteName: "Front",
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  contentContainer: {
    flex: 1
  },

  welcome: {
    fontSize: 40,
    textAlign: "center",
    margin: 10
  },

  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },

  title: { padding: 10, fontSize: 22 },

  input: {
    marginLeft: 10,
    flex: 1
  },

  smslogin: {
    margin: 20,
    color: "#2196F3"
  },
  buttonContainer: {
    margin: 20
  },

  button: {
    margin: 20,
    alignItems: "center",
    backgroundColor: "tomato"
  },
  disabled: {
    margin: 20,
    alignItems: "center",
    backgroundColor: "tomato",
    opacity: 0.5
  },

  buttonText: {
    padding: 10,
    fontSize: 22,
    color: "white"
  },

  signup: {
    marginRight: 20
  },
  cue: {
    alignItems: "center"
  },
  cueText: {
    color: "red"
  },
  processing: {
    backgroundColor: "#00000044",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});
