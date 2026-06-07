//It is good practice always to name your main file as index.js
//Because in Production World you have to deal with multiple files
//There will be lots of files/modules
//but to understand which is the main file which file should get executed
//to solve that We always prefer to name the main file as index.js not mandatory but as I said is a good practice
const http = require ("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();
    //Try to create LOGS
    const log = `${Date.now()}: ${req.url} New Request Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile('log.txt', log, (err, data) => {
        switch(myUrl.pathname){
            case '/': res.end("HomePage");
            break;
            case '/about': //res.end("I am Shreya Thakkar")
            const username = myUrl.query.myname;
            res.end(`Hi, ${username}`);
            break;


            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for " +search);
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