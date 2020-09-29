const startBtn = document.getElementById('start-button')
const gamesList = document.querySelectorAll('.games li')
const progressBar = document.getElementById('progress-bar')

isActiveDownloads = false;

const state = {
  progress: 0
};
let progressMock;

function start() {
  isActiveDownloads = true;
  changeStartBtn('pause')
  progressMock = setInterval(() => {
    if (state.progress >= 10) {
      stop()
    } else {
      state.progress += 1
    }

    console.log(state.progress)
  }, 300);

}

function stop() {
  isActiveDownloads = false;
  changeStartBtn('play')
  return clearInterval(progressMock);
}


/**
 * Change icon for button
 * @param  {'play' || 'pause'} icon for button
 */
function changeStartBtn(icon) {
  icon === 'play'
    ? startBtn.innerHTML = `<i class="fa fa-play"></i>`
    : startBtn.innerHTML = `<i class="fa fa-pause"></i>`
}


startBtn.addEventListener('click', () => {
  isActiveDownloads ? stop() : start()
})



