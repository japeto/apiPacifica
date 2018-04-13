import React, { Component } from 'react';
import { View } from 'react-native';
import ProductCard from './ProductCard.js';

const prods = ["Producto1", "Producto2","Producto3","Producto4","Producto5","Producto6","Producto7","Producto8"];

export default class Main extends Component {
  render() {
    return (
      <View >
       {
         prods.map(() => {
           return <ProductCard/> 
         })
       }
      </View>
    );
  }
}
