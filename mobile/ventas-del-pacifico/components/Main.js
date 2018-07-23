import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Profile from './Profile';
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
  Providers : { screen : Providers },
  Services : { screen : Services },
  Contact : { screen : Contact },
  About : { screen : About },
  Exit : { screen : Exit },
});

export default class Main extends React.Component {
  static navigationOptions = { header: null };
  constructor(props){
    console.log("main", props)
    super(props);
  }
  render() {
    console.log("this.props.name>>> ", this.props.name, this.props.state)
    return (
      <NavigationApp2 screenProps = {this.props.name} />
    );
  }
}