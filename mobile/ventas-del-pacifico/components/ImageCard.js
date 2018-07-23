import React from 'react';
import { StyleSheet, Text, View , Image , ScrollView , ToastAndroid , TouchableOpacity
       } from 'react-native';
       
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

export default class ImageCard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style = { styles.imageCard }>
        <View style = { styles.cardTop }>
          <Text style = { styles.imageCardTitle }>Producto</Text>
          <Text style = { styles.imageCardDate }>Publicado: 23 Abril 08</Text>
        </View>
        <Image style = { styles.image } source = {{ uri : 'http://via.placeholder.com/550x350' }} />
        <View style = { styles.bottombar }>
          <TouchableOpacity>
            <Ionicons name = 'md-eye' size = {30} color = 'orange' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name = 'md-add-circle' size = {30} color = 'orange' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name = 'md-share' size = {30} color = 'orange' />
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
    paddingBottom:'2%'
  },
  bottombar:{
    paddingTop : '2%',
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  imageCardDate : {
    fontSize : 12,
    color : '#757575',
    paddingBottom : '2%'
  },
  cardTop : {
    flexDirection : 'row',
    justifyContent:'space-between',
    alignItems : 'center'
  }
});