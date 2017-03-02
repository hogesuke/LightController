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
    this.state = { ws: ws, isPowerOn: false };

    ws.onmessage = (e) => this.handleReceiveMessage(e.data);
  }
  handleReceiveMessage(message) {
    this.setState({ isPowerOn: message === 'power_on' });
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
      <View style={[styles.container, this.state.isPowerOn ? styles.light : styles.dark]}>
        <Text
          style={[styles.button, styles.on]}
          onPress={this.handleOnClick.bind(this)}
        >
          ON
        </Text>
        <Text
          style={[styles.button, styles.off]}
          onPress={this.handleOffClick.bind(this)}
        >
          OFF
        </Text>
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
  light: {
    backgroundColor: '#ffffff'
  },
  dark: {
    backgroundColor: '#000000'
  },
  on: {
    backgroundColor: '#b1191e'
  },
  off: {
    backgroundColor: '#2138a3'
  },
  button: {
    margin: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 35,
    paddingLeft: 35,
    color: "#000000",
    fontSize: 80
  }
});

AppRegistry.registerComponent('LightController', () => LightController);
