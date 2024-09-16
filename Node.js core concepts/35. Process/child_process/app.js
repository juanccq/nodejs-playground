const app = require("express")();
const { fork } = require("child_process");

app.get('/heavy', (req, res) => {
    // spawn a new nodejs process/instance
    const child = fork(__dirname+"/count.js");
    // once the child operation is finished send the data to user
    child.on('message', (mycount) => {
        console.log("sending /heavy result");
        res.send(mycount);
    });

    // send message to the child signaling that it needs to start the heavy operation
    child.send('START_COUNT');
})

app.get('/light', (req, res) => {
    res.send('hello from light');
})

app.listen(5000, () => {
    console.log('server running on port: 5000');
    
})