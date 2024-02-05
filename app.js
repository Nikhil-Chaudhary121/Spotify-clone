const express = require("express");
const app = express();
const port = 8080;
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Song = require("./models/songListSchema");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname , "public")));
app.use(express.json());

main().then(res => console.log("connection successfull"))
.catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/spotifyclone')
}


app.get("/",(req, res)=> {
    res.render("index.ejs")
})

app.get("/songs", (req, res)=>{
    res.render("topList.ejs");
})

app.listen(port, ()=>{
    console.log("Server is running on poer : ",port);
})