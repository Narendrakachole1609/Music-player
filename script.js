console.log("Welcome to soptify")

let songIndex = 0;
let audioElement = new Audio('songslist/1.mp3')
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
{SongName:"likhe joh khat tujhe.mp3 ", filePath:"songslist/1.mp3", CoverPath: "songslist/cover.1.jfif"},
{SongName:"Jhanjaar -Mr.jatt.mp3 ", filePath:"songslist/2.mp3", CoverPath: "songslist/cover.2.jpg"},
{SongName:"waaliyan-favsong,mp3 ", filePath:"songslist/3.mp3", CoverPath: "songslist/cover.3.jfif"},
{SongName:"Dil ke badle sanam,mp3 ", filePath:"songslist/4.mp3", CoverPath: "songslist/cover.4.jpg"},
{SongName:"tum joh aaye.mp3", filePath:"songslist/5.mp3", CoverPath: "songslist/cover.5.jpg"},
{SongName:"tu maan meri jaan.mp3", filePath:"songslist/6.mp3", CoverPath: "songslist/cover.6.jfif"},
{SongName:"raatan lambiyaan lofi .mp3 ", filePath:"songslist/7.mp3", CoverPath: "songslist/cover.7.jpg"},
{SongName:"tu hi haqeekat lovesong.mp3", filePath:"songslist/8.mp3", CoverPath: "songslist/cover.8.jfif"},
{SongName:"channa ve kat-vikki.mp3 ", filePath:"songslist/9.mp3", CoverPath: "songslist/cover.9.jfif"},
]

// 
songItem.forEach((element,i) => {
element.getElementsByTagName("img")[0].src =songs[i].CoverPath;
element.getElementsByClassName("songName")[0].innerText = songs[i].SongName;    
})
// Handle to play/pause 
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].SongName;
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        masterSongName.innerText = songs[songIndex].SongName;
        gif.style.opacity = 0;
     }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100)
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100;
})
//handle to events 

const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName ('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click',(e)=>{
    makeAllPlays();
    songIndex= parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = `songslist/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].SongName;
    gif.style.opacity = 1;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})
})

document.getElementById('next').addEventListener('click', () => {
    if(songIndex>=9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src =  `songslist/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].SongName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src =  `songslist/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].SongName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})