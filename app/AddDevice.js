import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import QRCode from "react-native-qrcode";
// import { QRScannerView } from "ac-qrcode-scanner-rn";
import Scanner from "./ScannerScreen";
import api from "./api/api";

{
  /*  */
}

export default class AddDeviceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _addDevice() {
    let that = this;

    function a() {
      return new Promise((resolve, reject) => {
        that.props.navigation.navigate("Scanner", {
          callback: backdata => {
            const deviceInfo = JSON.parse(backdata);
            resolve(deviceInfo);
          }
        });
      });
    }

    function notify(data, clear) {
      let res = that.state.cue;
      if (!res) res = "";
      if (clear) res = "";
      res += "\r\n\r\n";
      res += data;

      that.setState({ ...this.state, cue: res });
    }

    async function addDevice(getter, notify) {
      // 1. get info
      const deviceInfo = await getter();
      notify(JSON.stringify(deviceInfo), true);

      // 2. request server
      const data = await api.addDevice(
        deviceInfo.productKey,
        deviceInfo.serialno
      );
      console.log("request result: " + data);
      notify(JSON.stringify(data));
      if (!data.Success) {
        throw new Error("request server fail");
      }

      let deviceData = data.Data;
      deviceData.serialno = deviceInfo.serialno;

      // 3. save to device
      notify("save to device: " + JSON.stringify(deviceData));
      that.setState({
        ...that.state,
        qrcode: JSON.stringify(deviceData)
      });
      console.log(JSON.stringify(deviceData));

      // 4. notify success
      notify("add success");
    }

    try {
      that.setState({
        ...that.state,
        qrcode: null
      });
      addDevice(a, notify)
        .then(data => {
          console.log("data: " + JSON.stringify(data));
        })
        .catch(error => {
          console.error(error);
          notify("add device fail");
        });
    } catch (e) {
      console.error(e);
      notify("add device fail");
    }
  }

  showDeviceTriple() {
    return this.state.qrcode;
  }

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "stretch" }}
      >
        <TouchableOpacity
          onPress={this._addDevice.bind(this)}
          style={{ alignItems: "stretch" }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>添加设备</Text>
          </View>
        </TouchableOpacity>

        {this.showDeviceTriple() ? (
          <View style={{ flex: 1, alignItems: "center" }}>
            <QRCode
              value={this.state.qrcode}
              size={200}
              bgColor="purple"
              fgColor="white"
            />
          </View>
        ) : null}

        <Text style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
          {this.state.cue}
        </Text>
      </View>
    );
  }
}
