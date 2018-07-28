import React from 'react';
import { StyleSheet, Text, View, Image,
         TouchableOpacity  , TextInput , Alert , ActivityIndicator
       } from 'react-native';
       
import APIUsers from '../api/APIUsers.js'
const user = new APIUsers();
import APIProducts from '../api/APIProducts.js'
const products = new APIProducts();

import Main from './Main';



export default class Login extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
      status : false,
      loaded : true,
      apikey:""
    }
    this.navigate = props.navigation.navigate.bind(this);
  }
  componentDidMount(){}
  logOut(){  
     this.setState({ status : false , loaded : true , email : '' , password : '' })
  }

  _loginUser(email, password){
    /*user.getUser(email, password).then((user) => {
      if (user.status){
        this.setState({ 
          email : email, status : true, loaded : true, apikey: user.key,
          first_name: user.first_name, last_name: user.last_name, 
          house_number: user.house_number, address_line_1: user.address_line_1
        });
      }else {
        Alert.alert(
          'Error de Acceso',
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
    })*/
    if(email == "marcela@ln.com.co" && password == "1216"){
        this.setState({ 
          email : "marcela@ln.co", status : true, loaded : true, apikey: "user.key",
          first_name: "Marcela", last_name: "Azcarate", 
          house_number: "333 33 333", address_line_1: "Cll 32 # 23 -12"
        });
    }
    if(email == "mayra@ln.com.co" && password == "12345"){
        this.setState({ 
          email : "mayra@ln.co", status : true, loaded : true, apikey: "user.key",
          first_name: "Mayra", last_name: "Erazo", 
          house_number: "333 33 333", address_line_1: "Cll 32 # 23 -12"
        });
    }
    if(email == "japeto" && password == "123"){
        this.setState({ 
          email : "japeto@ln.co", status : true, loaded : true, apikey: "user.key",
          first_name: "Jefferson", last_name: "Pena", 
          house_number: "333 33 333", address_line_1: "Cll 32 # 23 -12"
        });
    }
    if(email == "8907" && password == "8907"){
      this.setState({ 
        email : "email@email.com", status : true, loaded : true, apikey: "user.key",
        first_name: "user.first_name", last_name: "user.last_name", 
        house_number: "user.house_number", address_line_1: "user.address_line_1"
      });
    }

  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.status == true && this.state.loaded == true){
      return <Main name = {this.logOut.bind(this)} state= {this.state} />;
    }
    else if(this.state.status == false && this.state.loaded == true){
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
        <TouchableOpacity style = {styles.button} onPress = {() => this._loginUser(this.state.email, this.state.password) }>
          <Text style = { styles.buttonText } >Acceder</Text>
        </TouchableOpacity>
          <View style = {styles.signupTextContent}>
            <View style = {styles.signUpView} >
              <Text style = {styles.signupText} >¿No tienes una cuenta?</Text>
              <Text onPress = { () => this.navigate('Register') } style = { styles.signupText }> Registrate</Text>
            </View>
          </View>
        </View>
      );
  }
  else{
     return (
       <View style = { styles.container }><ActivityIndicator size="large" color="#fff" /></View>
       );
  }
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
     inputBox:{
       width:'75%',
       borderRadius : 5,
       backgroundColor : 'rgba(255,255,255,0.2)',
       height:40,
       color:'#fff',
       paddingHorizontal : 10,
       fontSize : 15,
       margin : 8,
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
     },
     signupTextContent : {
       alignItems : 'center',
       justifyContent : 'flex-end',
       marginTop : 10
       
     },
     signupText:{
      color:'#fff',
      fontWeight : 'bold'

     },
     logoText : {
       fontSize : 25,
       marginBottom : 60,
       color:'#fff',
       padding:20,
       fontWeight : 'bold'
     },
     signUpView : {
      flexDirection : 'row',
     }
});
