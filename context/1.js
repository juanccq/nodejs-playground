console.log(this);
module.exports.nickname = 'juan';
console.log(this);
globalThis.age = 40;
console.log(this);


function sayHi() {
    console.log('sayHI', this.age);
}

sayHi();

