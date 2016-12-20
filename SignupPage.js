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
  Text,TouchableOpacity,
  View
} from 'react-native';

export default class SignupPage extends Component {
  _onPressButton = () => {   this.props.navigator.pop(); };
  render() {
    _onPressButton = () => {   };
    return (
      <View style={styles.container}>
         <View style={styles.header}>
            <View style={styles.leftTitle}>
             <TouchableOpacity onPress={this._onPressButton}>
               <Text style={styles.fontSize}>Login</Text>
              </TouchableOpacity>
            </View>
             <View style={styles.centerTitle}>
              <Text style={styles.fontSize}>Signup</Text>
            </View>
            <View style={styles.rightTitle}>
             
            </View>
         </View>
         <View style={styles.content}>
         </View>
          <View style={styles.footer}>
         </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#F5FCFF',
  },
   header: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
   content: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
   leftTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
   centerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
   rightTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     
  },
   fontSize: { 
    fontSize:22,
    color:'white'
  }
});
 
