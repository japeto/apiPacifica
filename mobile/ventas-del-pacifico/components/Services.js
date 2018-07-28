import React from 'react';
import { StyleSheet, Text, View , DrawerLayoutAndroid, Dimensions, Image,
ScrollView , ToastAndroid , ToolbarAndroid, TouchableOpacity} from 'react-native';

import ImageCard from  './ImageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Services extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.navigate = props.navigation.navigate.bind(this);
  }
  
  open = () => {this._drawer.openDrawer(); }
  close = () => {this._drawer.closeDrawer(); }

  render() {
    //The navigation Drawer Layout
    let navigationView = (
      <View style = { styles.navView }>
        <View style = { styles.topbar }>
          <Text style ={ styles.textView }>Hello, JAPeTo</Text>
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
    return (
      <DrawerLayoutAndroid drawerWidth={300}
      ref={ref => this._drawer = ref}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      drawerBackgroundColor = "rgba(0,0,0,0.5)"
      renderNavigationView={() => navigationView}>

      <View style = { styles.toolbar }>
          <TouchableOpacity>
            <Ionicons onPress = {this.open.bind(this)} name = 'md-menu' size = {30} color = 'white' />
          </TouchableOpacity>
        <Text onPress = { () => this.navigate('Home') }  style = { styles.toolbarText }>                  </Text>
        <View style = {styles.rightTool}>
          <TouchableOpacity>
            <Ionicons onPress = { () => this.navigate('Home') } style = {styles.profileicon} size={30} color="white" />  
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../assets/images/logomovil.png")}/>
          <Text style={styles.companyName}>LoNuestro.com.co</Text>
          <Text style={styles.slogan}>El mercado de los productos locales</Text>
          <View style={styles.descriptionContent}>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, altera conceptam ei cum. Hinc temporibus repudiandae eu mel, cum impetus legendos ei. 
              Fugit everti dissentias duo cu, nihil fabellas id pri, nonumy verear ea pri. Sit et nisl eros.
            </Text>
          </View>
            <TouchableOpacity style = {styles.button}  onPress = { () => this.navigate('Home') } >
              <Text style = { styles.buttonText } >Salir</Text>
            </TouchableOpacity>
        </View>
              
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
  
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff7701',
    paddingBottom: 0,
  },
  logo:{
    width:120,
    height:120,
    justifyContent: 'center',
    marginBottom:10,
    marginTop:30,
  },
  companyName: {
    fontSize:32,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  slogan:{
    fontSize:18,
    fontWeight: '600',
    color: '#228B22',
    marginTop:10,
  },
  descriptionContent:{
    padding:30,
  },
  description:{
    fontSize:18,
    textAlign:'center',
    marginTop:10,
    color: '#FFFFFF',
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
  buttonText: {
    color: '#000',
  }




});