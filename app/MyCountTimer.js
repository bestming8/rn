import React, {Component  } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar,
    Alert,
    AppRegistry
} from 'react-native';
import api from './api/api'

export default class MyCountTime extends Component {
    constructor(props) {
        super(props);
        let timeLeft = this.props.timeLeft > 0 ? this.props.timeLeft : 5;
        let width = this.props.width || 100;
        let height = this.props.height || 50;
        let color = this.props.color || '#42A5F5';
        let fontSize = this.props.fontSize || 30;
        let fontWeight = this.props.fontWeight || '600';
        let borderColor = this.props.borderColor || '#42A5F5';
        let borderWidth = this.props.borderWidth || 1;
        let borderRadius = this.props.borderRadius || 4;
        let backgroundColor = this.props.backgroundColor || '#42A5F5';
        let begin = 0;
        let press = this.props.press;

        this.afterEnd = this.props.afterEnd || this._afterEnd;
        this.style = this.props.style;

        this.state = {
            timeLeft: timeLeft,
            begin: begin
        };
        this.countTextStyle = {
            textAlign: 'center',
            color: '#42A5F5',
            fontSize: fontSize,
            fontWeight: fontWeight

        };
        this.countViewStyle = {
            backgroundColor: backgroundColor,
            alignItems: 'center',
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            width: width,
            height: height
        }
    }

    countdownfn(timeLeft, callback, begin) {
        if (timeLeft > 0) {
            this.state.begin = 1;
            console.log("===lin===>");

            let that = this;
            let interval = setInterval(function () {
                if (that.state.timeLeft < 1) {
                    clearInterval(interval);
                    callback(that)
                } else {
                    let totalTime = that.state.timeLeft;
                    that.setState({
                        timeLeft: totalTime - 1
                    })
                }
            }, 1000)
        }
    }

    _beginCountDown() {
        if (this.state.begin === 1){
            return;
        }

        if (this.props.onStart) {
          console.log('------------onStart');
          this.props.onStart();
        }

        let time = this.state.timeLeft;
        console.log("===lin===> time " + time);
        let afterEnd = this.afterEnd;
        let begin = this.state.begin;
        console.log("===lin===> start " + begin);
        this.countdownfn(time, afterEnd, begin)
    }

    _afterEnd(that) {
        console.log('------------time over');
        that.setState({
            begin : 0,
            timeLeft : 5,
        })

        if (that.props.onEnd) {
          console.log('------------onEnd');
          that.props.onEnd();
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <TouchableOpacity 
              disabled={!this.props.canPress}
              style={[styles.enable, this.props.canPress ? {} : {opacity: 0.5}]}
              onPress={this._beginCountDown.bind(this)}>
              <View >
                  <Text
                      style={styles.text}> { this.state.begin === 0 ? '点击获取验证码' : this.state.timeLeft} </Text>
              </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
  enable: {
    flexDirection: 'column', 
    justifyContent:'center', 
    alignItems: 'center'
  },

  text: {color: '#2196F3', fontSize: 17,zIndex:999}
});
