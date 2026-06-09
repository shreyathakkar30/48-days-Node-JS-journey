const express = require("express");
//const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");
const { timeStamp } = require("console");
const app = express();



const port = 8000;

// Connection 
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
//This will return promises
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log('Mongo error', err));

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,

    },
    gender: {
        type: String
    }
}, { timestamps: true });


const User = mongoose.model('user', userSchema);


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

app.get('/users', async (req,res) => {
    const alldbUsers = await User.find({});
    const html = `
    <ul>
    ${alldbUsers.map(user => `<li>${user.firstName}- ${user.email}</li>`).join('')}
    </ul>
    `
    res.send(html);
});
//Rest API
app.get('/api/users', async (req, res) => {
    const alldbUsers = await User.find({});
    console.log(req.headers);
    res.setHeader('X-myName', "Shreya Thakkar") //Custom Header
    //Always add X to Custome headers
    console.log("I am in get route", req.myUserName);
    return res.json(alldbUsers);
});

app.get('/api/users/:id', async (req,res) => {
    const user = await User.findById(req.params.id);

    // const id = Number(req.params.id);
    // const user = users.find(users => users.id === id);
    if(!user) return res.status(404).json({ error : "user not found"});
    return res.json(user);
});

app.post('/api/users', async (req, res) => {
    //TO DO Create New User
    const body = req.body;
    if(
        !body ||
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender || 
        !body.job_title){
        return res.status(400).json({msg: "All fields are mandatory"});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,

    });

    console.log("result", result);

    return res.status(201).json({msg: "Success"});
    // users.push({...body, id: users.length + 1});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
    //     return res.status(201).json({status : "success", id: users.length});
    // })
    
})

app.patch('/api/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'});
    //TO DO Edit the user with ID
    return res.json({status : "Updated successfully"});
})

app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    //TO DO Delete the user with ID
    return res.json({status : "Deleted Successfully"});
})


app.listen(port, () => console.log(`Server Started at PORT ${port}`))