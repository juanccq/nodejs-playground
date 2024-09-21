class Bicycle {
    constructor(details) {
        this.maxWaitingTime = details.maxWaitingTime;
        this.address = details.address;
        this.type = 'Bicycle';
        this.maxSpeed = '10 km/h';
        this.driver = () => {
            // we call db here to find available driver for the order
        }
    }
}

module.exports = Bicycle;