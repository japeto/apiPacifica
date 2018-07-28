import RestClient from 'react-native-rest-client';
import config from '../config.js';

export default class APIOrders extends RestClient {
  constructor() {
    super(config.home);
    console.log("IP ", config.home);
  }
  // Order
  getAOrders () {
    return fetch(config.home+"/basket.json")
    //return fetch(config.home+"/products/"+path)
        .then(response=> response.json())
        .then(responseJson => responseJson.current_order.order_lines)
        .catch(error => console.error(error));

  }
  getOrders (offset, limit) {
    return this.GET('/orders?offset='+offset+'&limit='+limit)
      .then(response => response);
  }
  getOrder (order) {
    return this.GET('/orders/'+order.orderNumber)
      .then(response => response.data);
  }
  getOrderProduct (order) {
    return this.GET('/orders/'+order.orderId+"/product")
      .then(response => response.data);
  }
  getOrderCustomer (order, customer) {
    return this.GET('/orders/customer/'+customer.customerId)
      .then(response => response.data);
  }
  searchOrder (order, customer) {
    return this.GET('/orders/search?text='+order.text+'&customer'+customer.customerId)
      .then(response => response.data);
  }
  newOrder (order) {
    return this.POST('/doorder', order);
  }
  editOrder (order) {
    return this.PUT('/editorders', order);
  }
  delOrder (order) {
    return this.DELETE('/delorders/'+order.orderId);
  }

}