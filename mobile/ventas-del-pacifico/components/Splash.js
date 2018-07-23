import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../themes/styles.js'

export default class Splash extends Component {
  render() {
    return ( <View >
      <Text style={ styles.welcome}>
        LoNuestro.com.co v1.0
      </Text>
    </View>
    );
  }
}