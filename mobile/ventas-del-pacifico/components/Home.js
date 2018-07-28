import React from 'react';
import { StyleSheet, Text, View , DrawerLayoutAndroid , ScrollView , ToastAndroid , ToolbarAndroid,
         TouchableOpacity, ActivityIndicator, SearchBar, ListView, FlatList, Image
       } from 'react-native';
//import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, Avatar } from "react-native-elements";
import { StackNavigator } from 'react-navigation';

import ImageCard from  './ImageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import APIProducts from '../api/APIProducts.js'
const products = new APIProducts();

export default class Home extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.user = props.screenProps;
    this.state = { 
      loading: false,
      error: null,
      refreshing: false,
      data: []
    }
    this.navigate = props.navigation.navigate.bind(this);
}
componentDidMount() {
  this.getProducts("all");
}
getProducts = (path) => {
  this.setState({ loading: true, refreshing: true })
  products.getAProducts(path)
  .then(data => {
    this.setState({
      data: data,
      error: null,
      loading: false,
      refreshing: false
    })
  }).catch(error => {
    this.setState({ error, loading : false });
  })
}

refreshProducts = () => {
    this.setState({ refreshing: true},
      () => { this.getProducts("all");});
};
open = () => {this._drawer.openDrawer(); }
close = () => {this._drawer.closeDrawer(); }

renderHeader = () => {
  return <SearchBar placeholder="Type Here..." lightTheme round />;
};
//return <Text key = {index}>{movie.title}<Text>{movie.releaseYear}</Text></Text>    
renderImageCards(category) {
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
    if (this.state.data && this.state.data.length > 0){
      return (
        <View style={styles.container}>
          {
            this.state.data.map((product, index) => {
              if (category === product.product_category || category ==="all"){
                return <ImageCard navigation = {this.navigate} index={index} data={product}/>
              }
            })
          }
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
          <Text style = {styles.logoText} >la información de nuestros </Text>
          <Text style = {styles.logoText} >productos.</Text>
       </View>
      );
    }

  }
}
render() {
    //The navigation Drawer Layout
    var navigationView = (
      <View style = { styles.navView }>
        <View style = { styles.topbar }>
          <Text style ={ styles.textView }>Hello, { this.user['first_name'] }</Text>
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
    if(this.state.showLoading === true) {
      return (
        <View style = { styles.card }><ActivityIndicator size="large" color="#fff" /></View>
        );
    }
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
            <Ionicons onPress = { () => this.navigate('Exit') } style = {styles.profileicon} name="md-search" size={30} color="white" />  
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
            { this.renderImageCards("all") }
          </ScrollView>
          <ScrollView tabLabel="HOGAR">
            { this.renderImageCards("home") }
          </ScrollView>
          <ScrollView tabLabel="ROPA">
            { this.renderImageCards("clothes") }
          </ScrollView>
          <ScrollView tabLabel="COMIDA">
            { this.renderImageCards("food") }
          </ScrollView>
          <ScrollView tabLabel="OTROS">
            { this.renderImageCards("others") }
          </ScrollView>
      </ScrollableTabView>   
    </DrawerLayoutAndroid>
    );
  }
}
//Styles
const styles = StyleSheet.create({
  oops:{
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  },
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
   activityIndicator: {
    marginTop:"20%",
    bottom:0, 
    top:0,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
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