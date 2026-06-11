const express = require("express");
const urlRoute = require('./routes/url')
const { connectToDB } = require('./connect')
const URL= require('./models/url')
const app = express();
const PORT = 8001;


connectToDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('Mongodb connected!'))



app.use(express.json());
app.use('/url', urlRoute);
app.get('/:shortID',async (req,res) => {
    const shortID = req.params.shortID;
   const entry = await URL.findOneAndUpdate({
        shortID,
    }, 
    { 
        $push: {
        visitedHistory: {
            timestamp: Date.now(),
        }
    } 
})
res.redirect(entry.redirectURL)
})
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
