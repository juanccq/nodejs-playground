const express = require('express');
const {Worker, workerData} = require('worker_threads');

const app = express();

app.get('/heavy', (req, res) => {
    let worker = new Worker('./worker.js', {workerData: 'hello'});

    worker.on('message', (data) => {
        console.log(data);
        console.log(worker.threadId);
        res.json({data})
    });

    worker.on('error', (err)=>{
        res.send('something is wrong');
        throw err;
    })
});

app.get('/light', (req, res) => {
    res.send('form light');
})

app.listen(5000, () => console.log('listening on port 5000'));