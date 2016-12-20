/*
 * @file: Javascript
 * @description: Sample application.
 * @date: 20.12.2016
 * @author: Lancy Goyal
 * */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,AsyncStorage,
  Image
} from 'react-native'; 

import LoginPage from './LoginPage'; 
import SignupPage from './SignupPage'; 
import HomePage from './HomePage'; 

export default class reactdemo extends Component {
  _renderScene(route,navigator){
    AsyncStorage.getItem('userId', (err, result) => {
       
        if(result != null && result != '' && result != undefined ){
           return <HomePage navigator={navigator} data={route.data}/>  
        }
    });
    if(route.index===0){
      return <LoginPage navigator={navigator}/>
    }else if(route.index===1){
      return <SignupPage data={route.data} navigator={navigator}/>
    }else if(route.index===2){
      return <HomePage navigator={navigator} data={route.data}/>
    }else if(route.index==3){
    }
   
  }

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{index: 0}}
        renderScene={ this._renderScene } />
    );
  }
}
 


AppRegistry.registerComponent('reactSampleApp', () => reactdemo);
