import React from 'react';
import { StyleSheet, Text, View, Image,
         TouchableOpacity  , TextInput , Alert , ActivityIndicator
       } from 'react-native';

import APIUsers from '../api/APIUsers.js'
const user = new APIUsers();
import Main from './Main';

export default class Register extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
      status : false,
      loaded : true,
      user: {apikey:"", email:"", password : ''}
    }
  }
  componentDidMount(){}
  logOut(){  
     this.setState({ status : false , loaded : true , email : '' , password : '' })
  }

  registerUser(email,password){
    console.log("email ", email, "password", password);
  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.status == true && this.state.loaded == true){
      return <Main name = {this.logOut.bind(this)}/>;
    }
    else if(this.state.status == false && this.state.loaded == true){
      return (
        <View style = { styles.container }>

        <TextInput
         style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
         onChangeText = { (email) => this.setState({email}) }
         autoCorrect = { false } placeholder = 'Correo' />
        <TextInput
         style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
          onChangeText = { (password) => this.setState({ password }) }
          secureTextEntry = {true} autoCorrect = {false} placeholder = 'Contraseña'/>
        <TouchableOpacity style = {styles.button} onPress = {() => this.loginUser(this.state.email,this.state.password) }>
          <Text style = { styles.buttonText } >Registrar</Text>
        </TouchableOpacity>

      
        </View>
      );
  }
  else{
     return (<View style = { styles.container }><ActivityIndicator size="large" color="#fff" /></View>);
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
     }
});
