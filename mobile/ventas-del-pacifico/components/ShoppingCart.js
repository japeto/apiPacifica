import React from 'react';
import { StyleSheet, Text, View , DrawerLayoutAndroid, FlatList, Dimensions, ActivityIndicator, Image,
ScrollView , ToastAndroid , ToolbarAndroid, TouchableOpacity} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImageCard from  './ImageCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

import APIOrders from '../api/APIOrders.js'
const orders = new APIOrders();

export default class ShoppingCart extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.user = props.screenProps;
    this.navigate = props.navigation.navigate.bind(this);
    this.state = { 
      loading: false,
      error: null,
      refreshing: false,
      data: []
    }
  }
  componentDidMount() {
    this.getShoppingCart();
  }
  getShoppingCart = () => {
    this.setState({ loading: true, refreshing: true })
    orders.getAOrders()
    .then(data => {
      this.setState({
        data: data,
        loading: false,
        refreshing: false
      }); 
    }).catch(error => {
      this.setState({ error, loading : false });
    })
  }
  refreshShoppingCart= () => {
      this.setState({ refreshing: true},
        () => { this.getShoppingCart();});
  };
  open = () => {this._drawer.openDrawer(); }
  close = () => {this._drawer.closeDrawer(); }

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
    if (this.state.data && this.state.data.length > 0){
      return (
        <FlatList
            style={{ flex: 1 }}
            data={this.state.data}
            renderItem={({item}) =>
            <TouchableOpacity onPress = { () => this.navigate('Product', { 
                "id": item.id, 
                "product_added": item.product_added, 
                "product_category": item.product_category, 
                "product_description": item.product_description, 
                "product_image": item.product_image, 
                "product_name": item.product_name, 
                "product_price": item.product_price, 
                "product_size": item.product_size, 
                "stock_level": item.stock_level,
              } ) }>

              <View style={styles.itemBlock}>
                  <Image source={{ uri: 'data:image/png;base64,'+item.product_image}} style={styles.itemImage}/>
                  <View style={styles.itemMeta}>
                    <Text style={styles.itemName}>{item.product_name}</Text>
                    <Text style={styles.itemLastMessage}>$ {item.product_price}</Text>
                  </View>
              </View>
              
            </TouchableOpacity>
            }
            keyExtractor={item => item.id.toString()}
        />

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

//<View style={styles.container}>
//  {
//    this.state.data.map((product, index) => {
//      return <ImageCard navigation = {this.navigate} index={index} data={product}/>
//    })
//  }
//</View>

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
            tabBarUnderlineStyle={{backgroundColor: "#ff7701", height: 5,}}
            tabBarTextStyle={{fontSize: 15}}
            initialPage={0}
            >
          <ScrollView tabLabel="CARRITO DE COMPRA" >
            { this.renderData() }
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
  card : {
    marginLeft:'1%',
    marginRight:'1%',
    marginTop:'2%',
    marginBottom : '3%',
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
  itemBlock: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: '#F0F8FF',
    backgroundColor : '#FAEBD7'
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  itemMeta: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
  },
  itemLastMessage: {
    fontSize: 14,
    color: "#111",
  },
  toolbarText : {
    color : '#fff',
    fontSize : 30,
    fontWeight : 'bold'
  }
});