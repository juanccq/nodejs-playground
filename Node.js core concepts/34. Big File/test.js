const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if( req.url != "/favicon.ico") {
        res.writeHead(200, {"Content-Type": "text/plain"})
        const readStream = fs.createReadStream('./bigtextfile.txt');
        console.log('req made');

        readStream.pipe(res);
        
    }
});

server.listen(5000, "127.0.0.1", () => {
    console.log('Listening into port 5000');
    
})