const mongoose = require("mongoose");
const Song = require("./models/songListSchema");
const initData = require("./data");

main().then(res => console.log(res))
.catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/spotifyclone');
}

Song.insertMany(initData.data).then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err)
})