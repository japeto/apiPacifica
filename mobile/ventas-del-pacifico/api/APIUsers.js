import RestClient from 'react-native-rest-client';
import config from '../config.js';

export default class APIUsers extends RestClient {
  constructor() {
    super(config.home);
  }
  // Users
  getAUsers () {
    return
  }
  getUsers (offset, limit) {
    return this.GET('/users?offset='+offset+'&limit='+limit)
      .then(response => response.data);
  }
  getUserEmail = ( email ) => {
    return fetch(config.home+"/userdata.json")
        .then(response=> response.json())
        .then(responseJson => responseJson)
        .catch(error => console.error(error));
  }
  getUserOrders (user) {
    return this.GET('/users/'+user.userId+"/orders")
      .then(response => response.data);
  }
  getUserProducts(user) {
    return this.GET('/users/'+user.userId+"/products")
      .then(response => response.data);
  }
  getUser (email, password) {
    if (email == "") return;
    if (password == "") return;
    return this.POST('/users/', {appversion: config.version, email: email, password : password});
  }
  newUser (user) {
    return this.POST('/users/registration/', user);
  }
  editUser (user) {
    return this.PUT('/users', user);
  }
  searchUser (user) {
    return this.GET('/users/search?text='+user.text)
      .then(response => response.data);
  }
}