/*
 * @file: Javascript
 * @description: Sample application.
 * @date: 20.12.2016
 * @author: Lancy Goyal
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
  Image,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '',password: ''};
  }

  loginFunction = () => { 
    AsyncStorage.removeItem('userId');
         
   this.props.navigator.pop();
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
          <Text style={[styles.submit,styles.submitWithoutBold,{marginTop:6}]} >Hi {this.props.data.fullName} !</Text> 
          
          <TouchableOpacity  style={styles.button} onPress={this.loginFunction}>
            <Text style={styles.submit} >Logout</Text> 
          </TouchableOpacity>
       
        </View>
       </View>
       <View style={styles.footer}>
       
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
