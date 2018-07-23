import React from 'react';
import { StyleSheet, Text, View, Image,
  TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

export default class Profile extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.navigate = props.navigation.navigate.bind(this);
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style = { styles.container2 }>
        <Text style = {styles.profileText} >LoNuestro.com.co</Text>
      <View style = { styles.container1 }>
          <Image style={styles.logo} source={require("../assets/images/logomovil.png")}/>
          <View style={styles.centerRow}>
            <Text style={styles.titleText} numberOfLines={3}>
              Nace como la respuesta a las necesidades comerciales 
            </Text>
            <Text style={styles.titleText} numberOfLines={3}>
              de nuestro entorno, venta de productos colombianos
            </Text>
            <Text style={styles.titleText} numberOfLines={3}>
             culturales etc.
            </Text>
          </View>
        <TouchableOpacity style = {styles.button} onPress = { () => this.navigate('Home') }>
          <Text style = { styles.buttonText } >Regresar </Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#343a40'
    },
    container2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff7701'
    },
     button : {
       width:'75%',
       backgroundColor  :'#f7c744',
       alignItems : 'center',
       padding: 10,
       marginTop:10,
       marginBottom : 20,
       borderRadius : 5,
       justifyContent : 'center',
       elevation : 9,
     },
     profileText : {
       fontSize : 25,
       marginBottom : 60,
       color:'#ff7701',
       padding:20,
       fontWeight : 'bold'
     },
     buttonText : {
        color : '#000',
        fontSize : 15
     }
});