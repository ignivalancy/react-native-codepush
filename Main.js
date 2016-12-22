/*
 * @file: Javascript
 * @description: Sample application.
 * @date: 20.12.2016
 * @author: Lancy Goyal
 * */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  AsyncStorage,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from 'react-native'; 
import CodePush from "react-native-code-push";

import LoginPage from './LoginPage'; 
import SignupPage from './SignupPage'; 
import HomePage from './HomePage'; 

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */

export default class reactdemo extends Component {

  constructor() {
    super();
    this.state = { restartAllowed: true };
  }

  codePushStatusDidChange(syncStatus) {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Checking for update." });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Downloading package." });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "Awaiting user action." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installing update." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App up to date.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }

  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({ restartAllowed: !this.state.restartAllowed });
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
      .then((metadata: LocalPackage) => {
        this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version", progress: false });
      }, (error: any) => {
        this.setState({ syncMessage: "Error: " + error, progress: false });
      });
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  componentWillMount() {
      this.syncImmediate();
  }

  // render() {
  //   let progressView;

  //   if (this.state.progress) {
  //     progressView = (
  //       <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
  //     );
  //   }

  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.welcome}>
  //         Welcome to CodePush!
  //       </Text>
  //       <TouchableOpacity onPress={this.sync.bind(this)}>
  //         <Text style={styles.syncButton}>Press for background sync</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
  //         <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
  //       </TouchableOpacity>
  //       {progressView}
  //       <Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require("./logo.png")}/>
  //       <TouchableOpacity onPress={this.toggleAllowRestart.bind(this)}>
  //         <Text style={styles.restartToggleButton}>Restart { this.state.restartAllowed ? "allowed" : "forbidden"}</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity onPress={this.getUpdateMetadata.bind(this)}>
  //         <Text style={styles.syncButton}>Press for Update Metadata</Text>
  //       </TouchableOpacity>
  //       <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>
  //     </View>
  //   );
  // }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 50
  },
  image: {
    margin: 30,
    width: Dimensions.get("window").width - 100,
    height: 365 * (Dimensions.get("window").width - 100) / 651,
  },
  messages: {
    marginTop: 30,
    textAlign: "center",
  },
  restartToggleButton: {
    color: "blue",
    fontSize: 17
  },
  syncButton: {
    color: "green",
    fontSize: 17
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
});

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_START, installMode: CodePush.InstallMode.ON_NEXT_RESUME };

reactdemo = CodePush(codePushOptions)(reactdemo);
AppRegistry.registerComponent('reactSampleApp', () => reactdemo);
