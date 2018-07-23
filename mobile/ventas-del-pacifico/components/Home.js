import React from 'react';
import { StyleSheet, Text, View , DrawerLayoutAndroid , ScrollView , ToastAndroid , ToolbarAndroid,
         TouchableOpacity
       } from 'react-native';

import ImageCard from  './ImageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Home extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.navigate = props.navigation.navigate.bind(this);
  }
  
  navItemClick(s){
    ToastAndroid.show('Item ' + s + ' was Clicked', ToastAndroid.SHORT);
  }

  open = () => {this._drawer.openDrawer(); }
  close = () => {this._drawer.closeDrawer(); }

  render() {
    //The navigation Drawer Layout
    var navigationView = (
      <View style = { styles.navView }>
        <View style = { styles.topbar }>
          <Text style ={ styles.textView }>Hello, JAPeTo</Text>
        </View>
        <ScrollView style = { styles.navItemView }>
          <Text onPress = {this.close.bind(this)} style = { styles.navItem }>Principal</Text>
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
        
        <Text style = { styles.toolbarText }>LoNuestro.com.co</Text>
        
        <View style = {styles.rightTool}>
          <TouchableOpacity>
            <Ionicons onPress = { () => this.navigate('Exit') } style = {styles.profileicon} name="md-exit" size={30} color="white" />  
          </TouchableOpacity>
        </View>
      </View>

      <ScrollableTabView
            style={styles.toolbarText}
            tabBarBackgroundColor='white'
            tabBarActiveTextColor='#ff7701'
            tabBarInactiveTextColor='#555555'
            activeTabStyle={{ backgroundColor: 'red' }}
            tabBarUnderlineStyle={{backgroundColor: "#ff7701", color:"red", height: 5,}}
            tabBarTextStyle={{fontSize: 15}}
            initialPage={0}
            >
            <ScrollView tabLabel="TODOS" >
                <View style = { styles.card }>
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                </View>
            </ScrollView>
            <ScrollView tabLabel="HOGAR">
                <View style = { styles.card }>
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                </View>
            </ScrollView>
            <ScrollView tabLabel="ROPA">
               <View style = { styles.card }>
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                </View>
            </ScrollView>
            <ScrollView tabLabel="COMIDA">
               <View style = { styles.card }>
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                  <ImageCard />
                </View>
            </ScrollView>
            <ScrollView tabLabel="OTROS">
              <Text style={styles.welcome}>CONFIG</Text>
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
    card : {
      marginLeft:'1%',
      marginRight:'1%',
      marginTop:'2%',
      marginBottom : '3%',
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
    }

});