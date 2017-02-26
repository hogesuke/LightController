/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

export default class LightController extends Component {
  constructor(props) {
    super(props);

    const ws = new WebSocket('ws://192.168.1.13:8080/light');
    this.state = { ws: ws };
  }
  handleOnClick() {
    const { ws } = this.state;
    ws.send('power_on');
  }
  handleOffClick() {
    const { ws } = this.state;
    ws.send('power_off');
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleOnClick.bind(this)}
          title='On'
          color="#841584"
          accessibilityLabel="Power-on button"
        />
        <Button
          onPress={this.handleOffClick.bind(this)}
          title='Off'
          color="#841584"
          accessibilityLabel="Power-off button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LightController', () => LightController);
