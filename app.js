const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    const sounds = document.querySelectorAll('.sound-picker button');

    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    const outlineLength = outline.getTotalLength();

    let simpleDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    play.addEventListener('click', () => {
           checkPlaying(song);
    });


    timeSelect.forEach(option =>{
        option.addEventListener("click", function() {
            simpleDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(simpleDuration/60)}:${Math.floor(simpleDuration%60)}`;
        });
    });


    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else{
            song.pause();
            video.pause(); 
            play.src = './svg/play.svg';
        }
    };

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = simpleDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);


        let progress = outlineLength - (currentTime / simpleDuration) * outlineLength;
        outline.style.strokeDashoffset = progress; 

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= simpleDuration){
            song.pause();
            song.currentTime = 0;
            play.src = '.svg/play.svg';
            video.pause();

        }
    };

};

app();