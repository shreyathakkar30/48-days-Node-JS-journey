const express = require("express");
const path = require('path')
const { connectToDB } = require('./connect')
const URL= require('./models/url')
const app = express();
const PORT = 8001;


//Routes
const urlRoute = require('./routes/url')
const staticRoute = require("./routes/staticRouter")
const userRoute = require('./routes/user')

connectToDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('Mongodb connected!'))

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use("/url", urlRoute);

app.use("/", staticRoute)

app.use("/user", userRoute)

app.get('/test', async (req, res) =>{
    const allurls = await URL.find({});
    //return res.render("home", {
        //id: shortID,
        //urls: allurls,
    })
    // return res.end(`
    //     <html>
    //     <head></head>
    //     <body>
    //         <ol>
    //         ${allurls
    //             .map(url =>
    //                 `<li>
    //                 ${url.shortID} - 
    //                 ${url.redirectURL} - 
    //                Total Clicks: ${url.visitedHistory.length}</li>`)
    //                 .join("")}
    //         </ol>
    //     </body>

    //     </html>
    //     `)
   // return res.end('<h1>Hey From Server!</h1>')


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
