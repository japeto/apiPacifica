import RestClient from 'react-native-rest-client';
import config from '../config.js';

export default class APIProducts extends RestClient {
  constructor() {
    super(config.home);
  }
  // Productos
  getAProducts () {
    //return { title: "sdsdsd > ", prd: "producto" };
    return this.GET('/products')
      .then(response => response.data);
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