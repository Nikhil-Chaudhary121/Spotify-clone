
document.addEventListener('DOMContentLoaded', async() => {
    console.log("Enjoy Your Listing to spotify");
    

    const playPauseBtn = document.getElementById("play-pause-btn");
    const progBar = document.querySelector("#prog-bar");
    const nextBtn = document.querySelector(".next");
    const backBtn = document.querySelector(".back");
    const currTimeText = document.querySelector(".currTime");
    const totTimeText = document.querySelector(".totTime");
    const shuffleBtn = document.querySelector(".shuffle");
    const loopBtn = document.querySelector(".loop");
    const songTitle = document.querySelector(".song-name");
    let muteBtn = document.querySelector(".mute");
    const volBar = document.querySelector(".volume-bar");
    const sliderEl = document.querySelector(".prog-bar");
    const songList = document.querySelector(".song-list");
    const likeBtn = document.querySelector(".like-icon");

    let url = "http://localhost:8080/songs/list";

    let songfile = await getSongList(url);
    console.log(songfile[0].liked);

    

    async function getSongList(url) {
        try {
            let res = await fetch(url);
            res = await res.json();
            // console.dir(res);
            return res;
        } catch (error) {
            return ("No Fact Found ");
        }
    }
    


    let lastSongIdx = 99;


    let audioElement = new Audio("/songs/1.mp3");
    

    let songsIdx = 0;
    let songType = 0;



    let playPause = false;

    

    // let songfile = [
    //     {
    //         songName : "Jaga Jaga",
    //         songPath : "/songs/1.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "Joota Japani",
    //         songPath : "/songs/2.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "Mood fresh",
    //         songPath : "/songs/8.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "Study songs",
    //         songPath : "/songs/4.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "Coding Onn",
    //         songPath : "/songs/5.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "English top 15",
    //         songPath : "/songs/6.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "New edition",
    //         songPath : "/songs/7.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "Coding Onn",
    //         songPath : "/songs/3.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "English top 15",
    //         songPath : "/songs/9.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
    //     {
    //         songName : "New edition",
    //         songPath : "/songs/10.mp3",
    //         singer : "Nikhil Chaudhary",
    //         image: "/img/album_picture.jpeg"
    //     },
        
        
    // ]
    function onStart(){
        if(songfile[songsIdx].liked === 1){
            likeBtn.classList.remove("fa-regular");
            likeBtn.classList.add("fa-solid");
            likeBtn.classList.add("liked-icon")
            console.log( "song index",songsIdx)
        }else{
            likeBtn.classList.add("fa-regular");
            likeBtn.classList.remove("fa-solid");
            likeBtn.classList.remove("liked-icon")
        }
    }
    onStart();

    try {
        songList.addEventListener("click", (event)=>{

            if(
                event.target.id === "song"
            ){
                console.dir(event.target)
                if(lastSongIdx == event.target.tabIndex){
                    audioElement.play();
                    playPauseSong();
                    // songsIdx = event.target.tabIndex - 1;
                    // nextSong();
                    // console.log("last song if index :",lastSongIdx);
                    lastSongIdx = 99;
                }else{
                    songsIdx = event.target.tabIndex -1;
                    nextSong();
                    console.log("last song else index :",lastSongIdx);
                    lastSongIdx = event.target.tabIndex;
                }   
            }
            
        })
    } catch (error) {
        
        }


    progBar.addEventListener("change",(event) => {
        let totTime = parseInt(audioElement.duration);
        let proBarVal = progBar.value;
        let currtime = ((proBarVal  * totTime) / 100); 
        audioElement.currentTime = currtime;
        console.dir(event );
        
    })

    playPauseBtn.addEventListener("click", () =>{
        playPauseSong();
    })
    

    nextBtn.addEventListener("click", ()=>{
        nextSong();
        onStart();
    })


    backBtn.addEventListener("click", ()=>{
        backSong();
        onStart();
    })

    function progBarColorChange() {
        sliderEl.addEventListener("change", (event) => {
            
            })
    }

    audioElement.addEventListener("timeupdate", (data) =>{
        let progress = parseInt(audioElement.currentTime);
        let totTime = parseInt(audioElement.duration);
        let prsProg = ((progress / totTime) *100);
        const tempSliderValue = progBar.value; 
        const prog = (tempSliderValue / sliderEl.max) * 100;
        sliderEl.style.background = `linear-gradient(to right, #1bd760 ${prog}%, #ccc ${prog}%)`;
        changeCurrTime();
        progBar.value = prsProg;
        if(
            audioElement.played && 
            audioElement.currentTime === audioElement.duration
            ){
                nextSong();
            }
    })


    function nextSong(){
        if(songType === 0){
            if (songsIdx == songfile.length - 1) {
                songsIdx = 0;
                audioElement.src = songfile[songsIdx].songPath;
                playPauseSong();
                
            }
    
            else{
                songsIdx++;
                
                audioElement.src = songfile[songsIdx].songPath;
                playPauseSong();
            }
        }else if(songType === 1){
            audioElement.src = songfile[songsIdx].songPath;
            playPauseSong();
        }else{
            songsIdx = Math.floor(Math.random() *songfile.length +1);
            audioElement.src = songfile[songsIdx].songPath;
            playPauseSong();
        }
    }
    function backSong(){
        if(songType===0){
            if(songsIdx == 0){
                songsIdx = songfile.length-1;
                audioElement.src = songfile[songsIdx].songPath;
                playPauseSong();
                
            }else{
                songsIdx --;
                audioElement.src = songfile[songsIdx].songPath;
                playPauseSong();
                
            }
        }else if(songType === 1){
            audioElement.src = songfile[songsIdx].songPath;
            playPauseSong();
        }else{
            songsIdx = Math.floor(Math.random() *songfile.length +1);
            audioElement.src = songfile[songsIdx].songPath;
            playPauseSong();
        }
        
    }

    async function playPauseSong(){
       
        if(audioElement.paused || audioElement.currentTime<=0){
            await audioElement.play();
            console.log(` Song Number : ${songsIdx}`);
            playPauseBtn.src = "/img/pause-button.png";
            playPauseBtn.style.marginLeft = "14px";
            playPauseBtn.style.marginRight = "14px";
            setTotTime();
            songTitle.innerHTML = songfile[songsIdx].songName;
            
        }else if(audioElement.played){
            audioElement.pause();
            console.log(songsIdx);
            console.log(audioElement.src);
            playPauseBtn.src = "/img/player_icon3.png"
            // playPauseBtn.style.height = "2rem";
            playPauseBtn.style.marginLeft = "14px";
            playPauseBtn.style.marginRight = "14px";
            
        }

    }

    
    function muteUnmute(){
        if(audioElement.volume > 0){
            audioElement.volume = 0;
        }
        else{
            audioElement.volume = 1;
        }
    }
    muteBtn.addEventListener("click", ()=>{
        muteUnmute();
    })

    setVol();

    volBar.addEventListener("change", ()=>{
        volChange(volBar.value);
    })
    function changeVolColor(){
        const tempSliderValue = volBar.value; 
        const prog = (tempSliderValue / sliderEl.max) * 100;
        volBar.style.background = `linear-gradient(to right, #1bd760 ${prog}%, #ccc ${prog}%)`;
    }

    function volChange(value){
        let val = value/100;
        audioElement.volume = val;
        changeVolColor();
    }
    function setVol(){
        let vol = audioElement.volume*100;
        volBar.value = vol;
        changeVolColor();
    }

    function changeCurrTime() {
        let currentTime = audioElement.currentTime;
        let seconds = Math.floor(currentTime % 60);
        let foo = currentTime - seconds;
        let minutes = Math.floor(foo / 60);
        if(minutes > 60){
            let hours = Math.floor(minutes/60);
            minutes = Math.floor(minutes % 60);
            minutes = "0"+hours.toString() + ":" +minutes.toString(); 
        }else if(minutes <10){
            minutes ="0" + minutes.toString();
        }
        if(seconds < 10){
            seconds = "0" + seconds.toString();
        }
        
        let fixedCurrentTime = minutes + ":" + seconds;
        currTimeText.innerHTML = fixedCurrentTime;
    }
    function setTotTime() {
        let totalTime = audioElement.duration;
        let seconds = Math.floor(totalTime % 60);
        let foo = totalTime - seconds;
        let minutes = Math.floor(foo / 60);
        if(minutes > 60){
            let hours = Math.floor(minutes/60);
            minutes = Math.floor(minutes % 60);
            minutes = "0"+hours.toString() + ":" +minutes.toString(); 
        }else if(minutes <10){
            minutes ="0" + minutes.toString();
        }
        if(seconds < 10){
            seconds = "0" + seconds.toString();
        }
        let fixedtotTime = minutes + ":" + seconds;
        totTimeText.innerHTML = fixedtotTime;
    }

    loopBtn.addEventListener("click", ()=>{
        if (songType === 0 || songType===2) {
            songType = 1;
            console.log(songType);
            loopBtn.src = "/img/player_icon5-on.png"
            shuffleBtn.src = "/img/player_icon1.png"
        }else{
            songType = 0;
            console.log(songType);
            loopBtn.src = "/img/player_icon5.png"
            shuffleBtn.src = "/img/player_icon1.png"
        }
        
    })
    shuffleBtn.addEventListener("click", ()=>{
        if (songType === 1 || songType === 0) {
            songType = 2;
            console.log(songType);
            shuffleBtn.src = "/img/player_icon1-on.png"
            loopBtn.src = "/img/player_icon5.png"
        }else{
            songType = 0;
            console.log(songType);
            shuffleBtn.src = "/img/player_icon1.png"
            loopBtn.src = "/img/player_icon5.png"
        }
    })

    function updateSongList(newData){
    }

    likeBtn.addEventListener("click",async()=>{
        if(songfile[songsIdx].liked === 0){
            likeBtn.src = "/img/liked_icon.png"
            const id = songfile[songsIdx]._id;
            getSongList(`http://localhost:8080/songs/${id}`);
            dur = audioElement.duration;
            location.reload();
            }else{
                const id = songfile[songsIdx]._id;
                getSongList(`http://localhost:8080/songs/${id}`);
                likeBtn.src = "/img/album_icon1.png"
                dur = audioElement.duration;
                location.reload();
            }
            console.log("reloded")
            
            // Create an object with the data to be sent
            // const data = {
            // id: id,
            // };
            // Use fetch to send the data
            // fetch('http://localhost:8080/songs/liked', {
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            //     // Add any other headers if needed
            // },
            // body: JSON.stringify(data),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Success:', data);
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });


            // await Song.findByIdAndUpdate(id, {liked : 1})
            // console.log();
           
        
    })

});
