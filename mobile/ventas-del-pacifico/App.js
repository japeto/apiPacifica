import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';

const NavigationApp = StackNavigator({
  Login : { screen : Login },
  Register : { screen : Register },
  Logout : { screen : Logout }
});

export default class App extends React.Component {
  render() {
    return (
       <NavigationApp/>
    );
  }
}