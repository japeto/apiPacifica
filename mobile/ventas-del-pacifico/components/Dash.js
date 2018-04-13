import React, { Component } from 'react';
import { 
Text, View, ScrollView
} from 'react-native';
// You can import from local files
//import ProductCard from './components/ProductCard.js';
import Main from './Main.js';
import styles from '../themes/styles.js'
// or any pure javascript modules available in npm
import {  Header } from 'react-native-elements'; // Version can be specified in package.json
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Dash extends Component {
  render() {
    return (
      <View style={{flexDirection:'column', flex:1}}>
         <Header style={styles.header}
         placement="left" 
         leftComponent={{ icon: '', color: '#fff' }}
         centerComponent={{ text: 'OrderPacifik', style: { color: '#fff' } }}
         rightComponent={{ icon: 'search', color: '#fff' }}>
         </Header>
         <View style={{flex:1}}>
         <ScrollableTabView
            tabBarActiveTextColor="black"
            tabBarUnderlineStyle={{backgroundColor: 'blue'}}
            initialPage={0}
            >
            <ScrollView tabLabel="PRINCIPAL" style={styles.container}>
               <View style={styles.container}>
               <Main/>
                <Text style={styles.footer}>
                    JAPETO
                </Text>
               </View>
            </ScrollView>
            <ScrollView tabLabel="COMIDA">
              <Text style={styles.welcome}>PESCADO, CARNE, ETC</Text>
            </ScrollView>
            <ScrollView tabLabel="LICORES">
              <Text style={styles.welcome}>LICORES</Text>
            </ScrollView>
            <ScrollView tabLabel="OTROS">
              <Text style={styles.welcome}>BISUTERIA, ROPA, ETC</Text>
            </ScrollView>
            <ScrollView tabLabel="*">
              <Text style={styles.welcome}>CONFIG</Text>
            </ScrollView>
            </ScrollableTabView>   
         </View>
      </View>
    );
  }
}