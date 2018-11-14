import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  ActivityIndicator,
  Text,
  StyleSheet,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from "react-native";
import MyCountTimer from "./MyCountTimer";
import api from "./api/api";
import util from "./util";

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeStart: true,
      codeEnd: false,
      code: null
    };
  }

  _onCodeStart() {
    if (this.state.phoneNum) {
      console.log(JSON.stringify(api));

      api
        .verifycode(this.state.phoneNum)
        .then(data => {
          console.log("verifycode: " + JSON.stringify(data));
        })
        .catch(err => {
          console.error(err);
        });
    }

    console.log("_onCodeStart");
    this.setState({
      ...this.state,
      codeStart: true
    });
  }

  _onCodeEnd() {
    console.log("_onCodeEnd");
    this.setState({
      ...this.state,
      codeStart: false,
      codeEnd: true
    });
  }

  _shouldDisable() {
    let phoneNumOk = util.checkPhone(this.state.phoneNum);
    let codeOk = util.checkVerifyCode(this.state.verifyCode);

    console.log("checkPhone: " + phoneNumOk + ":" + this.state.phoneNum);
    console.log("codeOk: " + codeOk + ":" + this.state.verifyCode);

    return !(codeOk && phoneNumOk);
  }

  _signinsms() {
    if (!this.state.phoneNum || !this.state.verifyCode) return;

    this.setState({
      ...this.state,
      processing: true
    });
    api
      .signinsms(this.state.phoneNum, this.state.verifyCode)
      .then(data => {
        if (data.code) {
          this.setState({
            ...this.state,
            processing: false,
            cue: data.message
          });
          return;
        }

        this.setState({
          ...this.state,
          processing: false
        });
        console.log("signinsms: " + JSON.stringify(data));
        this.props.navigation.navigate("App");
      })
      .catch(err => {
        console.error(err);
        this.setState({
          ...this.state,
          processing: false
        });
      });
  }

  _getProgressView() {
    return this.state.processing ? (
      <View style={styles.processing}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    ) : null;
  }

  _getContentView() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }} />

        <View style={{ flex: 2 }}>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <Text style={styles.title}>手机</Text>

              <TextInput
                style={{ marginLeft: 24, flex: 1 }}
                placeholder="手机号码"
                onChangeText={text =>
                  this.setState({
                    ...this.state,
                    phoneNum: text,
                    cue: ""
                  })
                }
              />
            </View>

            <MyCountTimer
              style={{ marginRight: 0, width: 10 }}
              canPress={util.checkPhone(this.state.phoneNum)}
              timeLeft={3}
              onStart={this._onCodeStart.bind(this)}
              onEnd={this._onCodeEnd.bind(this)}
            />
          </View>

          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Text style={styles.title}>验证码</Text>

            <TextInput
              style={styles.input}
              placeholder="验证码"
              onChangeText={text =>
                this.setState({
                  ...this.state,
                  verifyCode: text,
                  cue: ""
                })
              }
            />
          </View>

          <TouchableOpacity
            onPress={this._signinsms.bind(this)}
            disabled={this._shouldDisable()}
            style={this._shouldDisable() ? { opacity: 0.5 } : {}}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>登录</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View
            alignItems="center"
            style={[
              styles.cue,
              { flex: 1, justifyContent: "flex-start", alignItems: "center" }
            ]}
          >
            <Text style={styles.cueText}>{this.state.cue}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._getContentView()}
        {this._getProgressView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

  title: { fontSize: 22 },

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

  codebutton: {
    alignItems: "center",
    backgroundColor: "#2196F3"
  },
  codebuttonText: {
    padding: 20,
    color: "white"
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
    marginTop: 40,
    marginRight: 20
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
  },
  cue: {
    alignItems: "center"
  },
  cueText: {
    color: "red"
  }
});
