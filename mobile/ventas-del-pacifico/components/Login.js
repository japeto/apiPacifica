import React from 'react';
import { StyleSheet, Text, View, Image,
         TouchableOpacity  , TextInput , Alert , ActivityIndicator
       } from 'react-native';

import APIUsers from '../api/APIUsers.js'
const user = new APIUsers();
import Main from './Main';
import Register from './Register'

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

  loginUser(email,password){
    console.log("loginUser >> email ", email, "password", password);
    /*user.getUser(email, password).then((user) => {
      if (user.status){
        this.setState({ email : email, status : true, loaded : true, apikey: user.key });
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

this.setState({ email : "email@admin.com", status : true, loaded : true, apikey: 1234 });

  }
  _onPressButton() {
    Alert.alert('You tapped the button!');
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
         value = "admin@lonuestro.com.co"/>
        <TextInput
         style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
          onChangeText = { (password) => this.setState({ password }) }
          secureTextEntry = {true} autoCorrect = {false} placeholder = 'Contraseña'/>
        <TouchableOpacity style = {styles.button} onPress = {() => this.loginUser(this.state.email, this.state.password) }>
          <Text style = { styles.buttonText } >Acceder</Text>
        </TouchableOpacity>
          <View style = {styles.signupTextContent}>
            <View style = {styles.signUpView} >
              <Text style = {styles.signupText} >No tienes una cuenta?</Text>
              
              <TouchableOpacity  onPress={this._onPressButton}>
                <Text style = { styles.signupText } > Registrate.</Text>
              </TouchableOpacity>

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
