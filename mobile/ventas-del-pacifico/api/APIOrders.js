import RestClient from 'react-native-rest-client';
import config from '../config.js';

export default class APIOrders extends RestClient {
  constructor() {
    //super(config.home);
    super('https://raw.githubusercontent.com/japeto/stackPacifica/master/data');
  }
  // Order
  getAOrders () {
    return this.GET('/order.json')
      .then(response => response);
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