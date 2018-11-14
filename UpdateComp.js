import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Toast
} from "react-native";
import Progress from "./progress";
//import { GlobalStyles } from "../../../constants/GlobalStyles";
//import { deviceInfo } from "../../../constants/DeviceInfo";
//import { Icon } from "../../../utils/iconFont";
import CodePush from "react-native-code-push";

//const CODE_PUSH_KEY = 'jE39cjdnkzqfpXgRylPXDDNkEzJm3ac740b8-b071-474f-afbf-369c6e4642ab'
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
};

const GlobalStyles = {
  white: "white",
  lineColor: "yellow",
  bgColor: "white",
  textBlockColor: "gray",
  textGrayColor: "gray",
  center: "center",
  row: "row"
};

const deviceInfo = {
  devicewidth: 600,
  deviceHeight: 900
};

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.currProgress = 0.0;
    this.syncMessage = "";
    this.state = {
      modalVisible: false,
      isMandatory: false,
      immediateUpdate: false,
      updateInfo: {}
    };
  }

  codePushStatusDidChange(syncStatus) {
    if (this.state.immediateUpdate) {
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          this.syncMessage = "Checking for update";
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.syncMessage = "Downloading package";
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          this.syncMessage = "Awaiting user action";
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          this.syncMessage = "Installing update";
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          this.syncMessage = "App up to date.";
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          this.syncMessage = "Update cancelled by user";
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          this.syncMessage = "Update installed and will be applied on restart.";
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          this.syncMessage = "An unknown error occurred";
          Toast.showError("更新出错，请重启应用！");
          this.setState({ modalVisible: false });
          break;
      }
    }
  }

  codePushDownloadDidProgress(progress) {
    if (this.state.immediateUpdate) {
      let p = parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(
        2
      );

      if (p >= 1) {
        this.setState({ modalVisible: false });
      }

      this.setState({
        ...this.state,
        currProgress: p
      });
    }
  }

  syncImmediate() {
    CodePush.checkForUpdate().then(update => {
      console.log("-------" + update);
      if (!update) {
        Toast.showLongSuccess("已是最新版本！");
      } else {
        this.setState({
          modalVisible: true,
          updateInfo: update,
          isMandatory: update.isMandatory
        });
      }
    });
  }

  componentWillMount() {
    CodePush.disallowRestart();
    this.syncImmediate();
  }

  componentDidMount() {
    CodePush.allowRestart();
  }

  _immediateUpdate() {
    this.setState({ immediateUpdate: true });
    CodePush.sync(
      { updateDialog: {}, installMode: CodePush.InstallMode.IMMEDIATE },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  renderModal() {
    return (
      <Modal
        animationType={"none"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => alert("Modal has been closed.")}
      >
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            {!this.state.immediateUpdate ? (
              <View>
                {/* <Image
                  style={{ width: deviceInfo.deviceWidth - 60 }}
                  source={require("images/updateBg.png")}
                  resizeMode={"stretch"}
                /> */}
                <View style={{ backgroundColor: GlobalStyles.white }}>
                  <View style={{ marginHorizontal: 15 }}>
                    <Text
                      style={{
                        marginVertical: 20,
                        fontSize: 17,
                        color: GlobalStyles.textBlockColor,
                        fontWeight: "bold"
                      }}
                    >
                      更新内容
                    </Text>
                    <Text style={{ lineHeight: 20 }}>
                      {this.state.updateInfo.description}
                    </Text>
                  </View>
                  <View
                    style={{ alignItems: GlobalStyles.center, marginTop: 20 }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: GlobalStyles.textGrayColor
                      }}
                    >
                      wifi情况下更新不到30秒
                    </Text>
                  </View>
                  {!this.state.isMandatory ? (
                    <View
                      style={{
                        flexDirection: GlobalStyles.row,
                        height: 50,
                        alignItems: GlobalStyles.center,
                        marginTop: 20,
                        borderTopColor: GlobalStyles.lineColor,
                        borderTopWidth: 1
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: false })}
                      >
                        <View
                          style={{
                            flexDirection: GlobalStyles.row,
                            alignItems: GlobalStyles.center,
                            width: (deviceInfo.deviceWidth - 60) / 2,
                            height: 50,
                            borderRightColor: GlobalStyles.lineColor,
                            borderRightWidth: 1,
                            alignItems: GlobalStyles.center,
                            justifyContent: GlobalStyles.center
                          }}
                        >
                          {/* <Icon
                            name={"oneIcon|reject_o"}
                            size={20}
                            color={"#B6B6B6"}
                          /> */}
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: "bold",
                              color: GlobalStyles.textGrayColor,
                              marginLeft: 10
                            }}
                          >
                            残忍拒绝
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: GlobalStyles.row,
                          alignItems: GlobalStyles.center,
                          width: (deviceInfo.deviceWidth - 60) / 2,
                          height: 50,
                          alignItems: GlobalStyles.center,
                          justifyContent: GlobalStyles.center
                        }}
                        onPress={() => this._immediateUpdate()}
                      >
                        <View
                          style={{
                            backgroundColor: "#3496FA",
                            flex: 1,
                            height: 40,
                            alignItems: GlobalStyles.center,
                            justifyContent: GlobalStyles.center,
                            margin: 10,
                            borderRadius: 20
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              color: GlobalStyles.white,
                              fontWeight: "bold"
                            }}
                          >
                            极速下载
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: GlobalStyles.row,
                        height: 60,
                        alignItems: GlobalStyles.center,
                        marginTop: 20,
                        borderTopColor: GlobalStyles.lineColor,
                        borderTopWidth: 1,
                        width: deviceInfo.deviceWidth - 60
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: GlobalStyles.row,
                          alignItems: GlobalStyles.center,
                          width: deviceInfo.deviceWidth - 60,
                          height: 50,
                          alignItems: GlobalStyles.center,
                          justifyContent: GlobalStyles.center
                        }}
                        onPress={() => this._immediateUpdate()}
                      >
                        <View
                          style={{
                            backgroundColor: "#3496FA",
                            flex: 1,
                            height: 40,
                            alignItems: GlobalStyles.center,
                            justifyContent: GlobalStyles.center,
                            borderRadius: 20,
                            marginHorizontal: 40
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              color: GlobalStyles.white,
                              fontWeight: "bold"
                            }}
                          >
                            立即更新
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View>
                {/* <Image
                  style={{ width: deviceInfo.deviceWidth - 60 }}
                  source={require("../../../assets/images/me/updateBg.png")}
                  resizeMode={"stretch"}
                /> */}
                <View
                  style={{
                    backgroundColor: GlobalStyles.white,
                    paddingVertical: 20,
                    backgroundColor: GlobalStyles.white,
                    alignItems: GlobalStyles.center
                  }}
                >
                  <Progress
                    progress={this.state.progress}
                    progressColor={"#89C0FF"}
                    style={{
                      marginTop: 20,
                      height: 10,
                      width: deviceInfo.deviceWidth - 100,
                      backgroundColor: GlobalStyles.bgColor,
                      borderRadius: 10
                    }}
                  />
                  <View
                    style={{
                      alignItems: GlobalStyles.center,
                      marginVertical: 20
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: GlobalStyles.textGrayColor
                      }}
                    >
                      版本正在努力更新中，请等待
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderModal()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.bgColor
  },
  modal: {
    height: deviceInfo.deviceHeight,
    width: deviceInfo.deviceWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  modalContainer: {
    marginHorizontal: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default CodePush(codePushOptions)(ProgressBar);
