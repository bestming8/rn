import React, { Component } from 'react';
import { Alert, AppRegistry, ActivityIndicator, Text, StyleSheet, TextInput, View, Button, TouchableOpacity  } from 'react-native';
import api from './api/api'
import util from './util'


export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _signup() {
    if (!this.state.phoneNum || !this.state.password)
      return

    this.setState({
      ...this.state,
      processing: true,
    })

    api.signup(this.state.phoneNum, this.state.password)
    .then(json => {
      console.log(JSON.stringify(json))
      if (json.code) {
        this.setState({
          ...this.state,
          processing: false,
          cue: json.message
        })
        return
      }

      this.setState({
        ...this.state,
        processing: false,
      })
      this.props.navigation.navigate('SignIn')
    })
    .catch(err => {
      console.error(err)
      this.setState({
        ...this.state,
        processing: false,
      })
    })
  }


  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  _shouldDisable() {
    let checkPhone = util.checkPhone(this.state.phoneNum)
    let checkPassword = util.checkPassword(this.state.password)
    

    console.log('checkPhone: ' + checkPhone + ':' + this.state.phoneNum)
    console.log('checkPassword: ' + checkPassword + ':' + this.state.password)

    return !(checkPhone && checkPassword)
  }

  render() {
    return (
      <View style={styles.container}>
        {this._getContentView()}
        {this._getProgressView()}
      </View>
    )
  }

  _getContentView() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>
        </View>

        <View style={{flex:2}}>
          <View style={{padding: 10, flexDirection: 'row', justifyContent: 'flex-start',
            alignItems: 'center',}}>

            <Text style={styles.title}>
              手机
            </Text>

            <TextInput style={styles.input}
              placeholder="手机号码"
              onChangeText={(text) => this.setState({
                ...this.state,
                phoneNum: text,
                cue:''
              })}
            />  
          </View>

          <View style={{padding: 10, flexDirection: 'row', justifyContent: 'flex-start',
          alignItems: 'center',}}>

            <Text style={styles.title}>
              密码
            </Text>

            <TextInput style={styles.input}
              placeholder="数字、字母两者组合6-12位"
              onChangeText={(text) => this.setState({
                ...this.state,
                password: text,
                cue: ''
              })}
            />
          </View>

          <TouchableOpacity 
            onPress={this._signup.bind(this)}
            disabled={this._shouldDisable()}
            style={this._shouldDisable() ? {opacity: 0.5} : {}}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>注册</Text>
            </View>
          </TouchableOpacity>
        </View>
       


        <View style={{flex:1}}>
          <View alignItems='center' style={[styles.cue, {flex:1, justifyContent:'flex-start', alignItems:'center'}]}>
              <Text style={styles.cueText}>{this.state.cue}</Text>
          </View>

          <View style={{justifyContent: 'flex-end', alignItems:'flex-end'}}>
            <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('SignIn')} >
                <Text style={styles.smslogin}>已有账号，去登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      </View>

    );
  }

  _getProgressView() {
    return this.state.processing 
      ? 
      (<View style={styles.processing}>
        <ActivityIndicator size="large" color="tomato" />
      </View>) 
      : 
      null
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  input: {
    marginLeft: 10,
    flex:1,
  },

  title: {padding: 10, fontSize: 22},

  smslogin: {
    margin: 20,
    color: '#2196F3',
  }, 
  buttonContainer: {
    margin: 20
  },

  button: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: 'tomato'
  },

  disabled: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: 'tomato',
    opacity: 0.5
  },

  buttonText: {
    padding: 10,
    fontSize: 22,
    color: 'white'
  },

  signup: {
  },

  processing: {
    backgroundColor: '#00000044',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right:0,
    bottom:0,
  },
  cue: {

    alignItems: 'center'
  },
  cueText: {
    color: 'red'
  },
});
