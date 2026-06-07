const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();

const port = 8000;

app.get('/users', (req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html);

//Rest API
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/api/users/:id', (req,res) => {
    const id = Number(req.params.id);
    const user = users.find(users => users.id === id);
    return res.json(user);
});

app.post('/api/users', (req, res) => {
    //TO DO Create New User
    return res.json({status : "pending"});
})

app.patch('/api/users:id', (req, res) => {
    //TO DO Edit the user with ID
    return res.json({status : "pending"});
})

app.delete('/api/users:id', (req, res) => {
    //TO DO Delete the user with ID
    return res.json({status : "pending"});
})


})
app.listen(port, () => console.log(`Server Started at PORT ${port}`))