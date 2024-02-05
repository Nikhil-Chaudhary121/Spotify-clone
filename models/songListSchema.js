const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songListSchema = new Schema({
    songName : {
        type : String,
        required : true,
        maxLength : 20
    },
    songPath : {
        type : String,
        default : "/songs/3.mp3",
    },
    singer :{
        type : String,
        default : "Nikhil Chaudhary"
    },
    image: {
        type : String,
        default : "/img/album_picture.jpeg"
    }
})

let Song = mongoose.model("Song", songListSchema);

module.exports = Song;