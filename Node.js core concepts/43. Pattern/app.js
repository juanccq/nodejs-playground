const express = require('express');
const app = express();
const Order = require('./Order');
const port = 5000;

app.use( express.json() );

app.post('/order', (req, res) => {
    const order = req.body;
    const newOrder = new Order(order);  
    console.log(newOrder.delivery);
    res.send('order received');
});

app.listen(port, () => {
    console.log('server running');
    
})