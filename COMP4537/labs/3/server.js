const utils = require('./utils');
const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    let param = url.parse(req.url, true).query["name"];
    if(param == undefined) {
        param = "Usman";
    };
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<font color="blue">Hello ${param}, What a beautiful day. Server current date and time is ${utils.date()}</font>`);
    res.end();
}).listen(3000);    

console.log(`Server is listening on port 3000`);