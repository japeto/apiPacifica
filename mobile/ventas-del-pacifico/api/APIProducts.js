import RestClient from 'react-native-rest-client';
import config from '../config.js';

export default class APIProducts extends RestClient {
  constructor() {
    super(config.home);
    console.log("IP ", config.home);
  }
  // Productos
  getAProducts = (path) => {
    return fetch(config.home+"/product.json")
    //return fetch(config.home+"/products/"+path)
        .then(response=> response.json())
        .then(responseJson => responseJson.products)
        .catch(error => console.error(error));
  }
  getProducts (offset, limit) {
    return this.GET('/products?offset='+offset+'&limit='+limit)
      .then(response => response.data);
  }
  getProduct (product) {
    return this.GET('/products/'+product.productId)
      .then(response => response.data);
  }
  getProductOrder (product) {
    return this.GET('/products/'+product.productId+"/order")
      .then(response => response.data);
  }
  newProduct (product) {
    return this.POST('/products', product);
  }
  editProduct (product) {
    return this.PUT('/products', product);
  }
  searchProduct (product) {
    return this.GET('/products/search?text='+product.text)
      .then(response => response.data);
  }
}