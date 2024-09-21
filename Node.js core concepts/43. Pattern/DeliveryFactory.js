const Bicycle = require("./Bicycle");
const MotorScooter = require("./MotorScooter");

class DeliveryFactory {
    create = (details) => {
        let delivery;

        if(details.delivery_method == 'bicycle') {
            delivery = new Bicycle(details)
        }

        if(details.delivery_method == 'motorscooter') {
            delivery = new MotorScooter(details)
        }

        delivery.tip = details.tip;

        return delivery;
    }
}

module.exports = DeliveryFactory;