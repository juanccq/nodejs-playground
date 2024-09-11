const port = process.argv[2];
const addr = process.argv[3];

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

let client_data = [];

server.on('error', (e) => {
    console.log('server error', err);
    server.close();
})

server.on('message', (msg, info) => {
    console.log(msg.toString().trim());
    client_data.push({port:info.port, address: info.address});
})

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}, ${address.port}`);
    
});

server.bind(port, addr);

// the process object provides information about the current Nodejs process and process objects
// in an instance of EventEmitter
// stdin.io listen for the user input
process.stdin.on('data', (d) => {
    if(d.toString().trim() == 'exit') {
        return process.exit();
    }

    if(client_data.length != 0) {
        client_data.forEach((client) => {
            server.send(d,client.port,client.address,(err) => {
                if(err) {
                    console.log(err);
                    throw err;
                }

                if(client_data.length > 0) {
                    client_data.shift();
                }
            });
        })
    }
});