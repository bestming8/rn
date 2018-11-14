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
import api from "./api/api";
import util from "./util";
import tokenstore from "./tokenstore";
import loginstore from "./loginstore";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false
    };

    loginstore.retrievePhoneNum().then(num => {
      this.setState({ ...this.state, phoneNum: num }).catch(e => {
        console.error(e);
      });
    });

    loginstore.retrievePassword().then(password => {
      this.setState({ ...this.state, password: password }).catch(e => {
        console.error(e);
      });
    });
  }

  _signin() {
    if (!this.state.phoneNum || !this.state.password) return;

    this.setState({
      ...this.state,
      processing: true
    });

    api
      .signin(this.state.phoneNum, this.state.password)
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
          processing: false,
          cue: "登录成功"
        });

        console.log(JSON.stringify(data));
        const token = data.accessToken;

        tokenstore.saveToken(token);

        loginstore.savePhoneNum(this.state.phoneNum);
        loginstore.savePassword(this.state.password);

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

  _shouldDisable() {
    let checkPhone = util.checkPhone(this.state.phoneNum);
    let checkPassword = util.checkPassword(this.state.password);

    console.log("checkPhone: " + checkPhone + ":" + this.state.phoneNum);
    console.log("checkPassword: " + checkPassword + ":" + this.state.password);

    return !(checkPhone && checkPassword);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._getContentView()}
        {this._getProgressView()}
      </View>
    );
  }

  _getContentView() {
    return (
      <View style={styles.contentContainer}>
        <View style={{ flex: 1 }} />

        <View style={{ flex: 2 }}>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Text style={styles.title}>手机</Text>

            <TextInput
              style={styles.input}
              placeholder="手机号码"
              value={this.state.phoneNum}
              onChangeText={text =>
                this.setState({
                  ...this.state,
                  phoneNum: text,
                  cue: ""
                })
              }
            />
          </View>

          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Text style={styles.title}>密码</Text>

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              textContentType="password"
              value={this.state.password}
              placeholder="数字、字母两者组合6-12位"
              onChangeText={text =>
                this.setState({
                  ...this.state,
                  password: text,
                  cue: ""
                })
              }
            />
          </View>

          <TouchableOpacity
            disabled={this._shouldDisable()}
            onPress={this._signin.bind(this)}
            style={this._shouldDisable() ? { opacity: 0.5 } : {}}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>登录</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View alignItems="center" style={[styles.cue, { flex: 1 }]}>
            <Text style={styles.cueText}>{this.state.cue}</Text>
          </View>

          <View
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            style={styles.signup}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignInSMS")}
            >
              <Text style={styles.smslogin}>用短信验证码登录</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={styles.smslogin}>无账号，去注册</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _getProgressView() {
    return this.state.processing ? (
      <View style={styles.processing}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    ) : null;
  }
}

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
