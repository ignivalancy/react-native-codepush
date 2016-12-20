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
    this.state = {email: '',password: ''};
  };

  loginFunction = () => { 
     
  if(this.state.email == '' && this.state.password == ''){
      Toast.show('Please enter valid UserName and password');
      return;
  }else if(this.state.email == ''){
      Toast.show('Please enter valid UserName');
      return;
  }else if(this.state.password == '' || this.state.password.length < 5){
      Toast.show('Please enter valid password');
      return;
  } 

  fetch('http://es-next-api.azurewebsites.net/token', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify({
    username:this.state.email,
    password:this.state.password,
    grant_type:'password',
    client_id:'ESWeb'
  })
  }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if(responseJson.status  == '200'){
          // AsyncStorage.setItem('userId', responseJson.data.fullName , () => { });
          this.props.navigator.push({index:2,data: {fullName:responseJson.data.fullName}});
          return;
        }else{
          Toast.show(responseJson.description);
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
      <LinearGradient colors={[ '#472431','#CC2B62']}   style={styles.linearGradient}>
       <View style={styles.header}>
         <View style={styles.empty}>
         </View>
         <View style={styles.logoContainer}>
           <Image style={styles.headerImage} source={require('./logo.png')} />  
           <Text style={[styles.submit,styles.submitWithoutBold,{marginTop:6}]} >DummyApp</Text> 
         </View>
       </View>
       <View style={styles.content}>
         <View style={styles.subcontent}>
           <Icons.Button  style={styles.iconWithInput} name="ios-mail" backgroundColor="transparent"  color="#B2667F">
             <TextInput 
                style={styles.inputs}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor = "#B2667F"
                placeholder="Enter UserName here" 
                value={this.state.email}
                autoCorrect={false}  
                onChangeText={(email) => {
                  this.setState({email});
                }}
              /> 
          </Icons.Button>
           <Icon.Button style={styles.iconWithInput}  name="lock" backgroundColor="transparent" color="#B2667F">
             <TextInput  
                style={styles.inputs}
                autoCapitalize="none"
                maxLength = {18}
                minLength = {5}
                secureTextEntry={true}
                placeholderTextColor = "#B2667F"
                placeholder="Enter password here (6-18)"
                autoCorrect={false} 
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({password});
                }}
               
                
              /> 
          </Icon.Button>
           
          <TouchableOpacity  style={styles.button} onPress={this.loginFunction}>
            <Text style={styles.submit} >Login</Text> 
          </TouchableOpacity>
          <TouchableOpacity   style={styles.forgotButton}  onPress={this.updateText}>
            <Text style={[styles.submit,styles.submitWithoutBold]} >Forgot my password?</Text> 
          </TouchableOpacity>
        </View>
       </View>
       <View style={styles.footer}>
        <TouchableOpacity   style={styles.forgotButton}  onPress={this.updateText}>
            <Text style={[styles.submit,styles.submitWithoutBold]} >Not registered yet? Signup now</Text> 
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
    flexDirection:'column'  
  },
   header: {
    flex: 1,
    flexDirection:'column', 
  },
  logoContainer: {
    flex: 2,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  },headerImage:{
    height:90,
    width:90
  },
  empty: {
    flex: 1,
    flexDirection:'column',

  },
   content: {
    flex: 1, 
    paddingLeft:25,
    paddingRight:25,
    flexDirection:'column',
   },
   subcontent: {
    flex: 1,
    flexDirection:'column',
    
  },
   footer: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'flex-end',
    padding:20
  },
  inputs:{
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize:16,
    height: 30,
    textAlign: 'center', 
    color:'white', 
    flex: 1, 
    padding: 2,
  },errorForm:{
     flex: 1, 
  },iconWithInput: {
     borderBottomColor: '#B2667F',
     borderBottomWidth: 1,
     marginTop:10

  },button:{
      backgroundColor: 'white',
      padding:10,
      marginTop:24
      
  },submit:{
    textAlign:'center',
    color:'#B2667F',
    fontSize:14,
    fontWeight:"bold"
  },forgotButton:{
     marginTop:10, 
  },submitWithoutBold:{
    fontWeight:"normal"
  }
});
