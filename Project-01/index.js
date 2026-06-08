const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();


const port = 8000;
// Middleware -plugin
app.use(express.urlencoded({ extended: false}))
//app.use(express.json({ extended: false }))//This will allow you  to work with JSON data
app.use((req, res, next) => {
    fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) =>{
        next();
    });
    //console.log("Hello from Middleware 1");
    //req.myUserName = 'Shreya Thakkar'
    //return res.json({ msg: "Hello from Middleware 1"})
    //next();
} )

// app.use((req, res, next) => {
//     console.log("Hello from Middleware 2", req.myUserName);
//     //return res.json({ msg: "Hello from Middleware 1"})
//     next();
//     //return res.end("Hey");
// } )

app.get('/users', (req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html);
});
//Rest API
app.get('/api/users', (req, res) => {
    console.log(req.headers);
    res.setHeader('X-myName', "Shreya Thakkar") //Custom Header
    //Always add X to Custome headers
    console.log("I am in get route", req.myUserName);
    return res.json(users);
});

app.get('/api/users/:id', (req,res) => {
    const id = Number(req.params.id);
    const user = users.find(users => users.id === id);
    return res.json(user);
});

app.post('/api/users', (req, res) => {
    //TO DO Create New User
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
        return res.json({status : "success", id: users.length});
    })
    
})

app.patch('/api/users:id', (req, res) => {
    //TO DO Edit the user with ID
    return res.json({status : "pending"});
})

app.delete('/api/users:id', (req, res) => {
    //TO DO Delete the user with ID
    return res.json({status : "pending"});
})


app.listen(port, () => console.log(`Server Started at PORT ${port}`))