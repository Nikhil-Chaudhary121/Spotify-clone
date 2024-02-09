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
    res.render("index.ejs");
    
})

app.get("/songs", (req, res)=>{
    res.render("topList.ejs");
})

app.get("/songs/liked", async (req, res)=>{
    let songlist = await Song.find({liked : 1});
    console.log(songlist);
    res.render("likedsongs.ejs",{songlist});
})

app.get("/songs/list", async (req, res)=>{
    let songFolder = await Song.find();
    res.send(songFolder);
})

app.get("/songs/:id",async(req, res)=>{
    let {id} = req.params;
    let song = await Song.findById(id);
    if (song.liked == 0) {
        let result =await Song.findByIdAndUpdate(id, {liked :1});
    } else {
        let result =await Song.findByIdAndUpdate(id, {liked : 0});
    }
    res.redirect("/songs/list");
})

app.listen(port, ()=>{
    console.log("Server is running on poer : ",port);
})