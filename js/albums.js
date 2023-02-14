let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.play`)

let search = new URLSearchParams(window.location.search);
let album = albums[search.get(`i`)];

container.innerHTML += `<div class="card mb-3">
<div class="row">
    <div class="col-12 col-md-4">
        <img src="${album.img}" alt="" class="img-fluid rounded-start">
    </div>
    <div class="col-8">
        <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">${album.description}</p>
            <p class="card-text"><small class="text-muted">Сборник выпущен в ${albums[0].year} году</small></p>
        </div>
    </div>
</div>
</div>`

for (let j = 0; j < album.tracks.length; j++) {
playlist.innerHTML += `
<li class="track list-group-item d-flex align-items-center">
<img src="assets/playlist-play.png" alt="" class="img-pause me-3" height="30px">
<img src="assets/playlist-playing.png" alt="" class="img-playing me-3 d-none" height="30px">
<div>
    <div>${album.tracks[j].author}</div>
    <div class="text-secondary">${album.tracks[j].title}</div>
</div>
<div class="time ms-auto">${album.tracks[j].time}</div>
<audio class="audio" src="${album.tracks[j].src}"></audio>
</li>`}


let audio = document.querySelector(`.audio`);


function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`); 
    for (let i = 0; i < trackNodes.length; i++) { 
        // Один элемент
        let node = trackNodes[i];   
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`); 
        let timeNode = node.querySelector(`.time`);
        // продолжи самостоятельно
        node.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (node.isPlaying) {
                node.isPlaying = false;
                // Поставить на паузу
                audio.pause();
                let imgPl = node.querySelector(`.img-playing`);
                let imgPa = node.querySelector(`.img-pause`);
                imgPl.classList.add(`d-none`);
                imgPa.classList.remove(`d-none`);
        
            // Если трек сейчас не играет...
            } else {
                node.isPlaying = true;
                updateProgress();
                let imgPl = node.querySelector(`.img-playing`);
                let imgPa = node.querySelector(`.img-pause`);
                imgPl.classList.remove(`d-none`);
                imgPa.classList.add(`d-none`);
                // Включить проигрывание
                audio.play();
            }
        });
        function updateProgress() {
            // Нарисовать актуальное время
            let time = getTime(audio.currentTime);
            timeNode.innerHTML = time;
          
            // Нужно ли вызвать её ещё раз?
            if (node.isPlaying) {
                  requestAnimationFrame(updateProgress);
            }
            
          }
    }
}
setupAudio();
function getTime(time) {
    let Csec = Math.floor(time);
    let min = Math.floor(Csec/60);
    let sec = Math.floor (Csec % 60);

    if(min < 10) {
        min = `0` + min;
    }
    if(sec < 10) {
        sec = `0` + sec;
    }
    return `${min}:${sec}`
}