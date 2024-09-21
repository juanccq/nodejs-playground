const Client=require('./Observer/Client');
const Category = require('./Observable/Category');

// create 2 new categories
const laptops = new Category('laptops');
const headphones = new Category('headphones');

// create new users
const adam = new Client('Adam');
const jhon = new Client('John');

laptops.subscribe(adam) // subscribe adam to laptos category
laptops.subscribe(jhon)

// listen to discount and nodiscount events on laptops
laptops.on('discount', (res) => console.log(res))
laptops.on('nodiscount', (res) => console.log(res))

// fire the discount emmiter on laptos
laptops.discount("12");

laptops.unsubscribe(jhon);

headphones.subscribe(jhon); // subscrive jon to headphones category

// listen to discount and nodiscount events on headphones
headphones.on('discount', (res) => console.log(res))
headphones.on('nodiscount', (res) => console.log(res))

headphones.discount("20")

laptops.noDiscount() // remove discount on laptoos

headphones.discount("30")

headphones.noDiscount();