const DeliveryFactory = require("./DeliveryFactory");

class Order {
    constructor( order ) {
        this.order_details = order.order_details; // array of details
        const deliveryFactory = new DeliveryFactory;

        this.delivery = deliveryFactory.create( order.delivery_details );
        return this;
    }
}

module.exports = Order;