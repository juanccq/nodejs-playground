import { readFile } from 'fs';

const cache = new Map();
console.log('cache', cache);


function inconsistentRead (filename, cb) {
    console.log('-----------> filename', filename);
    console.log('-----------> cb', cb.toString());
    console.log('-----------> cache.has(filename)', cache.has(filename));
    
    if (cache.has(filename)) {
        cb(cache.get(filename));
    }
    else {
        console.log('-----------> starting readFile');
        
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data);
            cb(data);

            console.log('-----------> cache after read', cache);
        });
    }
}

function createFileReader (filename) {
    const listeners = [];

    inconsistentRead(filename, value => {
        console.log('ir -----------> value', value);
        console.log('ir -----------> listeners preforEach', listeners);
        listeners.forEach(listener => listener(value));
        console.log('ir -----------> listeners postforEach', listeners);
    });

    return {
        onDataReady: listener => listeners.push(listener)
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const reader1 = createFileReader('sample-1.txt');
console.log('reader1', reader1);
console.log('reader1.onDataReady', reader1.onDataReady.toString());

reader1.onDataReady(data => {
    console.log(`-----------> First call data: ${data}`);
    
    sleep(2000);

    const reader2 = createFileReader('sample-1.txt');
    console.log('reader2', reader2);
    

    reader2.onDataReady(data => {
        console.log(`-----------> Second call data: ${data}`);
    });
})