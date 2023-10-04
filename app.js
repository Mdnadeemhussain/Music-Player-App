const playbtn = document.querySelector('#play-btn');
const progress = document.querySelector('#progress');
const songlist = document.querySelector('#song-list'); 

let songs = [
    {
        name: 'chal tere ishq me pad jate hai',
        id: 1
    }, 
    {
        name: 'heeriye',
        id: 2
    },
    {
        name: 'what jhumka',
        id: 3
    }, 
    {
        name: 'zihal-e-miskin',
        id: 4
    },
    {
        name: 'kudi',
        id: 5
    },
    {
        name: 'kaash',
        id: 6
    },
    {
        name: 'bol do na zara',
        id: 7
    }
]

const audio = new Audio('./songs/song4.mp3'); 

// Show songs in ul
for (let song of songs) {
    const li = document.createElement('li');
    li.innerText = song.name;
    li.setAttribute('id', song.id);
    li.classList.add('song-item');
    songlist.append(li);
}

// Play button click event
playbtn.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playbtn.children[0].classList.remove('fa-circle-play');
        playbtn.children[0].classList.add('fa-circle-pause');
    } else {
        audio.pause();
        playbtn.children[0].classList.remove('fa-circle-pause');
        playbtn.children[0].classList.add('fa-circle-play');
    }
});

// current time ko update karo
audio.addEventListener('timeupdate', function() {
    const currentprogress = (audio.currentTime / audio.duration) * 100;
    progress.value = currentprogress;
});

// input par apne hisab se aage piche karna
progress.addEventListener('change', function() {
    const updatedTime =(audio.duration * (progress.value / 100));
    audio.currentTime = updatedTime;
});

// gaana khud se select karo
songlist.addEventListener('click', function(e) {
    if (e.target.classList.contains('song-item')) {
        let songid = e.target.getAttribute('id');
        audio.src = `./songs/song${songid}.mp3`;
        audio.currentTime = 0;
        audio.play();
        playbtn.children[0].classList.remove('fa-circle-play');
        playbtn.children[0].classList.add('fa-circle-pause');
    }
});


const previousbtn = document.querySelector('#previous-btn');
const forwardbtn = document.querySelector('#forward-btn');

// ... (your existing code for the song list and play button)

// Previous button click event
previousbtn.addEventListener('click', function() {
    // Get the current song index
    const currentSongIndex = songs.findIndex(song => song.id === parseInt(audio.src.match(/song(\d+)\.mp3/)[1]));

    // Calculate the index of the previous song
    const previousSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;

    // Load and play the previous song
    audio.src = `./songs/song${songs[previousSongIndex].id}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playbtn.children[0].classList.remove('fa-circle-play');
    playbtn.children[0].classList.add('fa-circle-pause');
});

// Forward button click event
forwardbtn.addEventListener('click', function() {
    // Get the current song index
    const currentSongIndex = songs.findIndex(song => song.id === parseInt(audio.src.match(/song(\d+)\.mp3/)[1]));

    // Calculate the index of the next song
    const nextSongIndex = (currentSongIndex + 1) % songs.length;

    // Load and play the next song
    audio.src = `./songs/song${songs[nextSongIndex].id}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playbtn.children[0].classList.remove('fa-circle-play');
    playbtn.children[0].classList.add('fa-circle-pause');
});



