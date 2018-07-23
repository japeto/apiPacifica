import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import Logout from './components/Logout';

const NavigationApp = StackNavigator({
  Login : { screen : Login },
  Logout : { screen : Logout }
});

export default class App extends React.Component {
  render() {
    return (
       <NavigationApp/>
    );
  }
}
