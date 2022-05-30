const express = require ("express");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require('./server/database/connection');

const app = express();

const PORT = process.env.PORT||8080

//mongodb connection
connectDB();

//parse request to body-parser
app.use (bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "ejs") //you can replace ejs with pug or html
//app.set("views", path.resolve(__dirname, "views/ejs")) this is if adding files in subfolder of views

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//Load routers
app.use ('/', require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})
   