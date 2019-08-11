//Author : Oscuro Smith

var fs = require('fs');
var http = require('http');
var nStatic    = require('./server-module/node-static');

var fileServer = new nStatic.Server(__dirname);



var fileCache  = {};

var pathCache  = {};


function loadFileSync(path) {
    if (false) {//During Test Mode 
        return fileCache[path];
    } else {
        fileCache[path] = (fs.readFileSync(path)).toString();
        pathCache[path]=path;
        return fileCache[path];
    }
}



var PORT = process.env.PORT||8080;


function main() {


    console.log(" Server status:Running..." + "\nhost:localhost on Port:"+PORT);


    http.createServer(function (req, res) {
   console.log("Request Recieved:"+req.url);
    if(req.url!='/'){
        fileServer.serve(req, res);
    }else{
        let data = loadFileSync(__dirname+"/index.html");
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    }
    }).listen(PORT);

}



setTimeout(main, 1000);


