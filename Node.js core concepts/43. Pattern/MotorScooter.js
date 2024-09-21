class MotorScooter {
    constructor(details) {
        this.maxWaitingTime = details.maxWaitingTime;
        this.address = details.address;
        this.type = 'MotorScooter';
        this.maxSpeed = '35 km/h';
        this.driver = () => {
            // we call db here to find available driver for the order
        }
    }
}

module.exports = MotorScooter ; 