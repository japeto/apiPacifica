import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ScrollView,
  ToastAndroid,
  ToolbarAndroid,
  Share,
  Image,
  TouchableOpacity
} from 'react-native';

import ImageCard from './ImageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Ionicons
} from '@expo/vector-icons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import config from '../config.js';

export default class Product extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.user = props.screenProps;
    this.product = this.props.navigation.state.params;
    this.navigate = props.navigation.navigate.bind(this);

  }

  open = () => {
    this._drawer.openDrawer();
  }
  close = () => {
    this._drawer.closeDrawer();
  }
  _share = () => {
    Share.share({
        message: 'Compra ya este producto ' + config.home + '/product/' + this.data.id + ' en LoNuestro.com el mercado nuestro-',
        url: config.home + '/product/' + this.data.id,
        title: 'LoNuestro.com'
      })
      .then(result => console.log("result ", result))
      .catch(errorMsg => console.log("errorMsg ", errorMsg));
  }

  _addShoppingCart = () => {
    console.log("add shoping cart XXX ");
  }
  render() {
    //The navigation Drawer Layout
    var navigationView = (
      <View style = { styles.navView }>
        <View style = { styles.topbar }>
          <Text style ={ styles.textView }>Hello, { this.user['first_name'] }</Text>
        </View>
        <ScrollView style = { styles.navItemView }>
          <Text onPress = { () => this.navigate('Home') } style = { styles.navItem }>Principal</Text>
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
        <TouchableOpacity>
          <Ionicons onPress = { () => this.navigate('ShoppingCart') } name = 'md-cart' size = {30} color = 'white' />
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
            <ScrollView tabLabel="Producto" >
                <View style = { styles.card }>
                  
      <View style = { styles.imageCard }>
        <View style = { styles.cardTop }>
          <Text style = { styles.imageCardTitle }>{this.product.product_name}</Text>
          <Text style = { styles.imageCardDate }>{this.product.product_added}</Text>
        </View>
        <Image style = { styles.image } source={{ uri: 'data:image/png;base64,'+this.product.product_image}}/>

        <View style={styles.section}>
          <View style={ styles.separator }/>
          <Text style={ styles.texttop } >
            {this.product.product_description}
          </Text>
          <View style={ styles.separator }/>
        </View>

          <View style = { styles.bottombar }>
            <TouchableOpacity>
              <Ionicons name = 'md-arrow-dropleft-circle' size = {30} color = 'orange' 
              onPress = { () => this.navigate('Home') } />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress = { this._addShoppingCart.bind(this) } >
              <Ionicons name = 'md-add-circle' size = {30} color = 'orange'/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress = { this._share.bind(this) } >
              <Ionicons name = 'md-share' size = {30} color = 'orange'/>
            </TouchableOpacity>
          </View>
          
      </View>

                </View>
            </ScrollView>
        </ScrollableTabView>       
    </DrawerLayoutAndroid>
    );
  }
}
//<Text>El viche o biche es una bebida alcohólica de tipo artesanal típica del pacífico colombiano.</Text>
//Styles
const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ff7701",
    marginRight: "2%",
    marginLeft: "2%",
    marginTop: "2%"
  },
  navView: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  textView: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: '15%',
    fontWeight: 'bold'

  },
  topbar: {
    height: '20%',
    width: '100%',
    backgroundColor: '#ff7701',
  },
  navItemView: {
    flex: 1,
  },
  productInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  exitNavItem: {
    fontSize: 15,
    textAlign: 'center',
    margin: '6%',
    color: '#f00',
    fontWeight: 'bold'
  },
  navItem: {
    fontSize: 15,
    textAlign: 'center',
    margin: '6%'
  },
  lineStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#424242',

  },
  card: {
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '2%',
    marginBottom: '3%',
  },
  toolbar: {
    height: 80,
    backgroundColor: '#ff7701',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 11,
    zIndex: 10,
    alignItems: 'center',
  },
  toolbarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    height: 280,
  },
  imageCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: '2%',
    paddingLeft: '3%'
  },
  imageCardDate: {
    fontSize: 12,
    color: '#757575',
    paddingBottom: '2%',
    paddingRight: '3%'
  },
  bottombar: {
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

});