import React from 'react';
import { StyleSheet, Text, View , DrawerLayoutAndroid, Dimensions, ActivityIndicator, Image,TouchableHighlight,
TextInput, ScrollView , ToastAndroid , ToolbarAndroid, TouchableOpacity} from 'react-native';

import ImageCard from  './ImageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import APIUsers from '../api/APIUsers.js'
const apiUser = new APIUsers();

export default class Profile extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.navigate = props.navigation.navigate.bind(this);
    this.user = props.screenProps;
    this.state = { 
      loading: false,
      error: null,
      refreshing: false,
      data: []
    }
  }

  componentDidMount() {
    this.getUserData( this.user['email'] );
  }
  getUserData = (email) => {
    this.setState({ loading: true, refreshing: true })
    apiUser.getUserEmail( email )
    .then(data => {
      this.setState({
        data: data,
        avatar: null,
        error: null,
        loading: false,
        refreshing: false
      });

      this.setState({ 
        email : data.email, first_name: data.first_name, last_name: data.last_name, 
        house_number: data.house_number, address_line_1: data.address_line_1
      });

    }).catch(error => {
      this.setState({ error, loading : false });
    })
  }

  open = () => {this._drawer.openDrawer(); }
  close = () => {this._drawer.closeDrawer(); }

  renderAvatar() {
    if (this.state.data && Object.keys(this.state.data).length > 0){
      return(
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style = { styles.avatar } source={{ uri: 'data:image/png;base64,'+this.state.data.avatar}}/>
              <Text style={styles.name}>
                {this.state.data.first_name} {this.state.data.last_name} 
              </Text>
          </View>
        </View>
      );
    }else{ 
      return(
        <View style={styles.row}>
          <ActivityIndicator
            color="#ff7701"
            size = {54}
            thickness={3}
            style = {styles.activityIndicator}/>
        </View>
      );
    }
  }
  renderData() {
    if(this.state.loading == true || this.state.refreshing == true){
      return (
        <View style = { styles.container }>
          <ActivityIndicator
            color="#ff7701"
            size = {54}
            thickness={3}
            style = {styles.activityIndicator}/>
        </View>
      );
    }else{
      if (this.state.data && Object.keys(this.state.data).length > 0){
        return (
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TextInput
              style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
              onChangeText = { (first_name) => this.setState({first_name}) }
              autoCorrect = { false } placeholder = {this.state.data.first_name}
              autoCapitalize = 'none'/>
              <TextInput
              style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
              onChangeText = { (last_name) => this.setState({last_name}) }
              autoCorrect = { false } placeholder = {this.state.data.last_name}
              autoCapitalize = 'none'/>
              <TextInput
              style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
              onChangeText = { (house_number) => this.setState({house_number}) }
              autoCorrect = { false } placeholder = {this.state.data.house_number} />

              <TextInput
              style = {styles.inputBox} underlineColorAndroid = 'rgba(0,0,0,0)'
              onChangeText = { (address_line_1) => this.setState({address_line_1}) }
              autoCorrect = { false } placeholder = {this.state.data.address_line_1} />

            <TouchableOpacity style = {styles.button} onPress = {() => this.registerUser( this.state ) }>
              <Text style = { styles.buttonText } >Actualizar</Text>
            </TouchableOpacity>
            </View>
          </View>
        );
      }else{
        return (
        <View style = { styles.oops }>
          <ActivityIndicator
            color="#ff7701"
            size = {54}
            thickness={3}
            style = {styles.activityIndicator}/>
            <Text style = {styles.logoText} >Lo sentimos en este momento</Text>
            <Text style = {styles.logoText} >existe algún problema con</Text>
            <Text style = {styles.logoText} >la información de usuario </Text>
        </View>
        );
      }
    }
  }

  render() {
    //The navigation Drawer Layout
    let navigationView = (
      <View style = { styles.navView }>
        <View style = { styles.topbar }>
          <Text style ={ styles.textView }>Hello, { this.user['first_name'] }</Text>
        </View>
        <ScrollView style = { styles.navItemView }>
          <Text onPress = { () => this.navigate('Home') }  style = { styles.navItem }>Principal</Text>
          <Text onPress = { () => this.navigate('Profile') } style = { styles.navItem }>Perfil</Text>
          <View style = {styles.lineStyle} />
          <Text onPress = { () => this.navigate('ShoppingCart') } style = { styles.navItem }>Carrito</Text>
          <Text onPress = { () => this.navigate('Providers') } style = { styles.navItem }>Proveedores</Text>
          <Text onPress = { () => this.navigate('Services') } style = { styles.navItem }>Servicios</Text>
          <View style = {styles.lineStyle} />
          <Text onPress = { () => this.navigate('Contact') } style = { styles.navItem }>Contacto</Text>
          <Text onPress = { () => this.navigate('About') }  style = { styles.navItem }>Acerca de LoNuestro.com.co</Text>
          <Text onPress = { () => this.navigate('Exit') } style = { styles.exitNavItem }>Salir</Text>
        </ScrollView>
      </View>
    );
    //<View style={[styles.header, styles.bordered]}>
    return (
      <DrawerLayoutAndroid drawerWidth={300}
      ref={ref => this._drawer = ref}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      drawerBackgroundColor = "rgba(0,0,0,0.5)"
      renderNavigationView={() => navigationView}>

      <View style = { styles.toolbar }>
          <TouchableOpacity>
            <Ionicons onPress = { () => this.navigate('Home') } style = {styles.profileicon} name="md-arrow-dropleft-circle" size={30} color="white" />  
          </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons onPress = { () => this.navigate('ShoppingCart') } name = 'md-cart' size = {30} color = 'white' />
        </TouchableOpacity>
        <Text onPress = { () => this.navigate('Home') }  style = { styles.toolbarText }>LoNuestro.com.co</Text>
        <View style = {styles.rightTool}>
          <TouchableOpacity>
            <Ionicons onPress = { () => this.navigate('Home') } style = {styles.profileicon} name="md-search" size={30} color="white" />  
          </TouchableOpacity>
        </View>
      </View>
      <ScrollableTabView style={styles.toolbarText}
            tabBarBackgroundColor='white'
            tabBarActiveTextColor='#ff7701'
            tabBarInactiveTextColor='#555555'
            activeTabStyle={{ backgroundColor: 'red' }}
            tabBarUnderlineStyle={{backgroundColor: "white", color:"red", height: 10,}}
            tabBarTextStyle={{fontSize: 15}}
            initialPage={0} >
            <ScrollView tabLabel="Mi Perfil" >
              <View style={styles.container}>
                <View style={styles.header}>
                  <View style={styles.headerContent}>
                    { this.renderAvatar() }
                  </View>
                </View>
                { this.renderData() }
              </View>
            </ScrollView>
      </ScrollableTabView>
    </DrawerLayoutAndroid>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  navView : {
    flex :1,
    backgroundColor : '#FFF'
  },
  header:{
    backgroundColor: "#343a40",
  },
  headerContent:{
    padding:20,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:10,
  },
  inputBox:{
    width:'80%',
    borderRadius : 3,
    backgroundColor : 'rgba(255,255,255,0.4)',
    height: 30,
    color:'#fff',
    paddingHorizontal : 10,
    fontSize : 14,
    margin : 7,
  },
  button : {
    width:'80%',
    backgroundColor  :'#f7c744',
    alignItems : 'center',
    padding: 10,
    marginTop:10,
    marginBottom : 20,
    borderRadius : 4,
    justifyContent : 'center',
    elevation : 4,
  },
  textView : {
    color : '#fff',
    fontSize : 20,
    textAlign : 'center',
    marginTop : '15%',
    fontWeight: 'bold'
  },
  topbar : {
    height : '20%',
    width : '100%',
    backgroundColor : '#ff7701',
  },
  navItemView:{
    flex : 1,
  },
  exitNavItem:{
    fontSize : 15,
    textAlign : 'center',
    margin:'6%',
    color : '#f00',
    fontWeight: 'bold'
  },
  navItem : {
    fontSize : 15,
    textAlign : 'center',
    margin:'6%'
  },
  lineStyle:{
    borderBottomWidth: 0.5,
    borderBottomColor:'#424242',
  },
  toolbar : {
    height:80,
    backgroundColor : '#ff7701',
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingTop : 20,
    paddingLeft : 10,
    paddingRight : 10,
    elevation : 11,
    zIndex : 10,
    alignItems : 'center',
  },
  toolbarText : {
    color : '#fff',
    fontSize : 30,
    fontWeight : 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});