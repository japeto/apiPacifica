import React from 'react';
import { StyleSheet, Text, View , Image , ScrollView, ToastAndroid, 
TouchableOpacity, Share } from 'react-native';
       
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import config from '../config.js';

export default class ImageCard extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.navigate = props.navigation;
    this.data = props.data;
    this.index = props.index;
  }
  _share = () => {
    Share.share({
      message: 'Compra ya este producto '+config.home+'/product/'+this.data.id+' en LoNuestro.com el mercado nuestro-',
      url: config.home+'/product/'+this.data.id,
      title: 'LoNuestro.com'
    })
    .then(result => console.log("result ",result))
    .catch(errorMsg => console.log("errorMsg ",errorMsg));
  }
  
  _addShoppingCart = () =>{
    console.log("add shoping cart XXX ");
  }
  // <Image style = { styles.image } source = {{ uri : 'http://via.placeholder.com/550x350' }} />
  render() {
    return (
      <View style = { styles.imageCard }>
        <View style = { styles.cardTop }>
          <Text style = { styles.imageCardTitle }>{this.data.product_name}</Text>
          <Text style = { styles.imageCardDate }>{this.data.product_added}</Text>
        </View>
        <Image style = { styles.image } source={{ uri: 'data:image/png;base64,'+this.data.product_image}}/>
        <View style = { styles.bottombar }>
          <TouchableOpacity>
            <Ionicons onPress = { () => this.navigate('Product', { 
                "id": this.data.id, 
                "product_added": this.data.product_added, 
                "product_category": this.data.product_category, 
                "product_description": this.data.product_description, 
                "product_image": this.data.product_image, 
                "product_name": this.data.product_name, 
                "product_price": this.data.product_price, 
                "product_size": this.data.product_size, 
                "stock_level": this.data.stock_level,
                "addShoppingCart" : this._addShoppingCart.bind(this),
                "share" : this._share.bind(this),
              } ) }
            name = 'md-eye' size = {30} color = 'orange' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name = 'md-add-circle' size = {30} color = 'orange' 
            onPress = {this._addShoppingCart.bind(this)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name = 'md-share' size = {30} color = 'orange' 
            onPress = {this._share.bind(this)} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
//Styles
const styles = StyleSheet.create({
   image : {
     width : '100%',
     height: 250,
   },
   imageCard : {
     paddingLeft : '2%',
     paddingRight : '2%',
     paddingTop : '4%',
     paddingBottom : '3%',
     borderRadius :5,
    elevation : 5,
    zIndex : 8
  },
  imageCardTitle:{
    fontSize : 14,
    fontWeight : 'bold',
    textAlign : 'left',
    paddingBottom:'2%',
    paddingLeft:'3%'
  },
  imageCardDate : {
    fontSize : 12,
    color : '#757575', 
    paddingBottom : '2%',
    paddingRight: '3%'
  },
  bottombar:{
    paddingTop : '2%',
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  cardTop : {
    flexDirection : 'row',
    justifyContent:'space-between',
    alignItems : 'center'
  }
});