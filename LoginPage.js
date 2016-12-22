/*
 * @file: Javascript
 * @description: Sample application.
 * @date: 20.12.2016
 * @author: Lancy Goyal

http://es-next-api.azurewebsites.net/swagger/ui/index#!/Auth/post_token
grant_type=password&username=9460780780&password=123456&client_id=ESWeb

 * */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Button,
    AsyncStorage,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

export default class LoginPage extends Component {
  constructor(props) {
      super(props);
      this.state = { email: '', password: '' };
  };

  loginFunction = () => {

      if (this.state.email == '' && this.state.password == '') {
          Toast.show('Please enter valid UserName and password');
          return;
      } else if (this.state.email == '') {
          Toast.show('Please enter valid UserName');
          return;
      } else if (this.state.password == '' || this.state.password.length < 5) {
          Toast.show('Please enter valid password');
          return;
      }

      let data = {
       grant_type: 'password',
       username: this.state.email,
       password: this.state.password,
       client_id: 'ESWeb'
      };

      // console.log(JSON.stringify(data));

      fetch('http://es-next-api.azurewebsites.net/token', {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((responseJson) => {
              // console.log(responseJson)
              if (!responseJson.error) {
                  AsyncStorage.setItem('userId', responseJson.data.fullName , () => { });
                  this.props.navigator.push({ index: 2, data: { fullName: responseJson.data.fullName } });
                  return;
              } else {
                  Toast.show(responseJson.error);
                  return;
              }
          })
          .catch((error) => {
              console.log(error)
          });

  };
  updateText = (text) => {

  };
  render() {

    return (
      <LinearGradient colors={[ '#35465F','#151c26']} style={styles.linearGradient}>
       <View style={styles.header}>
         <View style={styles.empty}>
         </View>
         <View style={styles.logoContainer}>
           <Image style={styles.headerImage} source={require('./logo.png')} />  
           <Text style={[styles.submit,styles.submitWithoutBold,{marginTop:15}]}>Made In India</Text> 
         </View>
       </View>
       <View style={styles.content}>
         <View style={styles.subcontent}>
           <Icons.Button  style={styles.iconWithInput} name="ios-mail" backgroundColor="transparent"  color="#fff">
             <TextInput 
                style={styles.inputs}
                autoCapitalize="none"
                placeholderTextColor = "#fff"
                placeholder="Enter Username" 
                value={this.state.email}
                autoCorrect={false}  
                onChangeText={(email) => {
                  this.setState({email});
                }}
              /> 
          </Icons.Button>
          <Icon.Button style={styles.iconWithInput} name="lock" backgroundColor="transparent" color="#fff">
             <TextInput  
                style={styles.inputs}
                autoCapitalize="none"
                maxLength = {18}
                minLength = {5}
                secureTextEntry={true}
                placeholderTextColor = "#fff"
                placeholder="Enter Password"
                autoCorrect={false} 
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({password});
                }}                
              /> 
          </Icon.Button>
           
          <TouchableOpacity style={styles.button} onPress={this.loginFunction}>
            <Text style={styles.submit}>Login</Text> 
          </TouchableOpacity>
          <TouchableOpacity   style={styles.forgotButton}  onPress={this.updateText}>
            <Text style={[styles.submit,styles.submitWithoutBold]}>Forgot password</Text> 
          </TouchableOpacity>
        </View>
       </View>
       <View style={styles.footer}>
        <TouchableOpacity   style={styles.forgotButton}  onPress={this.updateText}>
            <Text style={[styles.submit,styles.submitWithoutBold]}>Signup now</Text> 
          </TouchableOpacity>
       </View>
      </LinearGradient>
    );

  }
}

const styles = StyleSheet.create({

    default: {
        height: 26,
        borderWidth: 0.5,
        borderColor: '#0f0f0f',
        flex: 1,
        fontSize: 13,
        padding: 4,
    },
    linearGradient: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flex: 1,
        flexDirection: 'column',
    },
    logoContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImage: {
        height: 100,
        width: 100
    },
    empty: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'column',
    },
    subcontent: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 15
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 20
    },
    inputs: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        fontSize: 16,
        height: 55,
        textAlign: 'center',
        color: 'white',
        flex: 1,
        padding: 2,
    },
    errorForm: {
        flex: 1,
    },
    iconWithInput: {
        borderBottomColor: '#B2667F',
        borderBottomWidth: 1,
        marginTop: 5
    },
    button: {
        backgroundColor: '#0CA3D1',
        padding: 10,
        marginTop: 10
    },
    submit: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 17,
        fontWeight: "bold"
    },
    forgotButton: {
        marginTop: 15,
    },
    submitWithoutBold: {
        fontWeight: "normal"
    }
});
