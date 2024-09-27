const EventEmiter = require('events')

var result;

class Calculator extends EventEmiter {
    async calculate(x,y) {
        result = x+ y;
        setTimeout( () => {this.emit('result', result);}, 1000);
    }
}

const calc = new Calculator();

calc.on('result', (result) => {
    result++;
})

console.log(`The results is ${result}`);

calc.calculate(2, 3)
