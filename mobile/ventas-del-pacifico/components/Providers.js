import React from 'react';
import { StyleSheet, Text, View , DrawerLayoutAndroid, Dimensions,
ScrollView , ToastAndroid , ToolbarAndroid, TouchableOpacity} from 'react-native';

import ImageCard from  './ImageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class Profile extends React.Component {
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
            <Ionicons onPress = { () => this.navigate('Home') } style = {styles.profileicon} name="md-arrow-dropleft-circle" size={30} color="white" />  
          </TouchableOpacity>
        <Text onPress = { () => this.navigate('Home') }  style = { styles.toolbarText }>LoNuestro.com.co</Text>
        <View style = {styles.rightTool}>
          <TouchableOpacity>
            <Ionicons onPress = { () => this.navigate('Home') } style = {styles.profileicon} name="md-arrow-dropright-circle" size={30} color="white" />  
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
            <ScrollView tabLabel="Panel proveedores" >

              <View style={[styles.header, styles.bordered]}>
                <View style={styles.row}>
                  <Ionicons name = 'md-person' size = {90} color = 'white' />
                </View>
                <View style={styles.section}>
                  <Text style={ styles.texttop } >hello world 1.........</Text>
                </View>
              </View>

              <View style={styles.userInfo}>
                <View style={styles.section}>
                  <Text  >hello world 1.........</Text>
                </View>
                <View style={styles.section}>
                  <Text  >hello world 1.........</Text>
                </View>
                <View style={styles.section}>
                  <Text  >hello world 1.........</Text>
                </View>
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
  header: {
    paddingTop: 25,
    paddingBottom: 17,
    backgroundColor: '#343a40'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 2,
    borderColor: '#ff7701'
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  texttop: {
    color: '#fff'
  }
});