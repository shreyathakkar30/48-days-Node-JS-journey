//File Handling
//fs stands for filesystem
const fs = require("fs");
//what is this fs??
//In nodeJS the FS module is built in module and is already there
//We use this module to interact with files
//examples:
//Synchronous Call 
// "./" means current Directory
//Blocking request
fs.writeFileSync('./test.txt', 'Hey Worlddd!!');
//If we change here the Previous File will be deleted and a new file with new content or changed content will be created
//What is the difference: Synchronous is considered as Blocking Task 
//Where as Async is considered as Async Tasks
//Use Async because it runs smoothly without crashing the web server
//This is Aschronous 
//Non Blocking Request
fs.writeFile('./test.txt', 'Hey Worlddd!!', (err) => {});
//Lets understand File Reading both Async and Sync
//Sync me result return hota haii which means if there's error use try catch block
 const result = fs.readFileSync('./contacts.txt', "utf-8");
 console.log(result);

//Async
//Async expects that k tum mujhe 1 callback function dedo jisme me tumhe if error hoga to vo 
//otherwise result de dunga
//Aur jo Async hota hai vo kuchh return nahi krta
 fs.readFile("./contacts.txt", "utf-8", (err, result) => {
     if(err){
         console.log("Error", err)
     }else{
         console.log(result)
     }

 });

//We can also append data in files
//instead of override we can use append
fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString());
fs.appendFileSync('./test.txt', 'Hey There\n');
fs.appendFileSync('./test.txt', `${Date.now()} Hey There\n`);
//Copy a file
fs.cpSync("./test.txt", "./Copy.txt");
//u can also delete file using unlinkSync
fs.unlinkSync("./Copy.txt");

//Blocking Request -> Sync
console.log('1')
const result = fs.readFileSync('./contacts.txt', "utf-8");
//Here One thread will be occupied
//Execution will be Top to bottom
console.log(result);
console.log('2')
//Lets use the same example to understand Async Concept
//Async is NonBlocking Request
console.log('1')
fs.readFile("contacts.txt", "utf-8", (err, result) => 
    {
        console.log(result);
    });
console.log('2');
console.log('3');
//Code to check your machine CPUs
const os = require("os");
console.log(os.cpus().length)
//We should always write a code which is NonBlocking so that remaining should work smoothly
