import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import styles from '../themes/styles.js'

export default class ProductCard extends Component {
  render() {
    return (
      <View style={styles.prd}>
        <Image style={styles.logo} source={require("../assets/images/coco.png")}/>
        <Text style={styles.paragraph}>
          Este es un producto de prueba
        </Text>
        <Button  title='Pedir Ahora' color="#0091EA"/>
      </View>
    );
  }
}