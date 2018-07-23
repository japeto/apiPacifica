import RestClient from 'react-native-rest-client';
import config from '../config.js';

export default class APIUsers extends RestClient {
  constructor() {
    super(config.home);
  }
  // Users
  getAUsers () {
    return this.GET('/users')
      .then(response => response.data);
  }
  getUsers (offset, limit) {
    return this.GET('/users?offset='+offset+'&limit='+limit)
      .then(response => response.data);
  }
  getUserId (user) {
    return this.GET('/users/'+user.userId)
      .then(response => response.data);
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
    return this.POST('/users/', {appversion:"v1.10", email: email, password : password});
  }
  newUser (user) {
    return this.POST('/users', user);
  }
  editUser (user) {
    return this.PUT('/users', user);
  }
  searchUser (user) {
    return this.GET('/users/search?text='+user.text)
      .then(response => response.data);
  }
}