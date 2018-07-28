import React from 'react';
import { StyleSheet, Text, View, Image,
         TouchableOpacity  , TextInput , Alert , ActivityIndicator
       } from 'react-native';

import APIUsers from '../api/APIUsers.js'
const user = new APIUsers();
import Login from './Login';

export default class Register extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      house_number: '',
      address_line_1: '',
      email : '',
      password : '',
      status : false,
      loaded : true,
      registered : false,
      apikey:""
    }
    this.navigate = props.navigation.navigate.bind(this);
  }
  componentDidMount(){}
  logOut(){  
     this.setState({ status : false , loaded : true , email : '' , password : '', registered: false})
  }

  registerUser( data ){
    user.newUser(  data ).then((user) => {
      console.log("response ", user);
      if (user.status){
         Alert.alert(
            'Bienvenido',
            'Accede a los servicios de LoNuestro.com',
        );
        this.setState({ status : true, loaded : true, registered:true}); 
        //this.navigate('Login') 
      }else {
        Alert.alert(
            'Error de registro',
              user.error,
              [{text: 'Continuar', onPress: () => console.log('Error')}]
            );
          this.setState({ status : false, loaded : true}); 
        }
      }).catch((err) => {
        Alert.alert(
          'Error de Acceso',
          "En este momento no podemos procesar su solicitud \n[ "+err+" ]",
            [{text: 'Continuar', onPress: () => 
            console.log('There was an error:' + err)}]
          );
        this.setState({ status : false, loaded : true});
        console.log('There was an error:' + err)
    })
   }

            /*<View style={{ flexDirection:'row' }}>
              <TextInput
              style = {styles.inputBoxInline} underlineColorAndroid = 'rgba(0,0,0,0)'
              onChangeText = { (first_name) => this.setState({first_name}) }
              autoCorrect = { false } placeholder = 'Nombre' />

              <TextInput
              style = {styles.inputBoxInline} underlineColorAndroid = 'rgba(0,0,0,0)'
              onChangeText = { (last_name) => this.setState({last_name}) }
              autoCorrect = { false } placeholder = 'Apellido' />
            </View>*/

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = { styles.container }>
        <Image style={styles.logo} source={require("../assets/images/logomovil.png")}/>
        <Text style = {styles.logoText} >LoNuestro.com.co</Text>

        <TextInput
        style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
        onChangeText = { (email) => this.setState({email}) }
        autoCorrect = { false } placeholder = 'Correo'
        autoCapitalize = 'none'/>

        <TextInput
        style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
        onChangeText = { (password) => this.setState({ password }) }
        secureTextEntry = {true} autoCorrect = {false} placeholder = 'Contraseña'/>

        <TextInput
        style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
        onChangeText = { (repassword) => this.setState({ repassword }) }
        secureTextEntry = {true} autoCorrect = {false} placeholder = 'Retepetir Contraseña'/>

        <TextInput
        style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
        onChangeText = { (house_number) => this.setState({house_number}) }
        autoCorrect = { false } placeholder = 'Telefono' />

        <TextInput
        style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
        onChangeText = { (address_line_1) => this.setState({address_line_1}) }
        autoCorrect = { false } placeholder = 'Dirección' />
        
      <TouchableOpacity style = {styles.button} onPress = {() => this.registerUser( this.state ) }>
        <Text style = { styles.buttonText } >Registrar</Text>
      </TouchableOpacity>
  
      </View>
    );
  }
}
//Styles
const styles = StyleSheet.create({
     container : {
       flex : 1,
       alignItems : 'center',
       justifyContent : 'center',
       backgroundColor : '#ff7701'
     },
     logoText : {
       fontSize : 15,
       color:'#fff',
       fontWeight : 'bold'
     },
     inputBoxInline:{
       width:'38%',
       borderRadius : 3,
       backgroundColor : 'rgba(255,255,255,0.2)',
       height: 40,
       color:'#fff',
       paddingHorizontal : 10,
       fontSize : 14,
       margin : 7,
     },
     inputBox:{
       width:'80%',
       borderRadius : 3,
       backgroundColor : 'rgba(255,255,255,0.2)',
       height: 40,
       color:'#fff',
       paddingHorizontal : 10,
       fontSize : 14,
       margin : 7,
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
     buttonText : {
        color : '#000',
        fontSize : 15
     }
});
