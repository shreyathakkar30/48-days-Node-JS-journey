//It is good practice always to name your main file as index.js
//Because in Production World you have to deal with multiple files
//There will be lots of files/modules
//but to understand which is the main file which file should get executed
//to solve that We always prefer to name the main file as index.js not mandatory but as I said is a good practice
const http = require ("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    //Try to create LOGS
    const log = `${Date.now()}: ${req.url} New Request Received\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        switch(req.url){
            case '/': res.end("HomePage");
            break;
            case '/about': res.end("I am Shreya Thakkar")
            break;
            default: res.end("404 Not found")
        }
         // res.end("Hello From Server Again");//You can send here anything 
    })
    //console.log(req)
    //console.log('New Req Received');
  
});
//PORT is like a door for example there's a house which consists of Multiple doors
//From which door you want to enter in the house
//Will be dicided by PORT number
//If you're having multiple servers You can't run them on a same port
myServer.listen(8000, () => {
    console.log("Server Started!!")
})