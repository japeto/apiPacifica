import React, { Component } from 'react';
import {  Text, View, StatusBar, StyleSheet, Image } from 'react-native';
import styles from './themes/styles.js'
import Dash from './components/Dash.js';
//import APIProducts from './api/APIProducts.js'
//const api = new APIProducts();
import APIOrders from './api/APIOrders.js'
const orders = new APIOrders();
const offset = 1;
const limit = 5;
/*
const Splash = (
    <View style={styles.load}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#4F6D7A"
      />
      <Text style={ styles.welcome}>
        OrderPacifik v1.0
      </Text>
      <Text style={styles.instructions}>
        Cargando... 
      </Text>
      <Image style={styles.logo} source={require("./assets/images/loader.gif")}/>
    </View>
);
*/
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOrders: {},
    }
  }
  componentDidMount() {
    orders.getAOrders().then((data) => {
      this.setState({
        dataOrders: data.orders
      });
    });
  }
  render() {
    return (
      <View style={styles.load}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{backgroundColor: 'brown', flex: 0.3}} />
        <View style={{backgroundColor: 'white', flex: 0.5}} />
        <Text style={ styles.welcome}> OrderPacifik v1.0 </Text>
      </View>
      <Text style={styles.instructions}> Cargando... </Text>
      <Text style={styles.instructions}> 
      {JSON.stringify(this.state.dataOrders)}
      </Text>
      </View>
    );
  }
}
