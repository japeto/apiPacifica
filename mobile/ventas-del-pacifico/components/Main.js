import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Profile from './Profile';
import Product from './Product';
import ShoppingCart from './ShoppingCart';
import Providers from './Providers';
import Services from './Services';
import Contact from './Contact';
import About from './About';
import Exit from './Exit';

const NavigationApp2 = StackNavigator({
  Home:{ screen :Home },
  Profile : { screen : Profile },
  ShoppingCart : { screen : ShoppingCart },
  Product : { screen : Product },
  Providers : { screen : Providers },
  Services : { screen : Services },
  Contact : { screen : Contact },
  About : { screen : About },
  Exit : { screen : Exit },
});

export default class Main extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
  }
  render() {
    return (
      <NavigationApp2 screenProps = {
        { 
          logout: this.props.name,
          email : this.props.state['email'],
          first_name : this.props.state['first_name'],
          last_name : this.props.state['last_name'],
          house_number : this.props.state['house_number'],
          address_line_1 : this.props.state['address_line_1'],
          status : false,
          loaded : true,
          registered : false,
          apikey: this.props.state['apikey']
        }
      } />
    );
  }
}