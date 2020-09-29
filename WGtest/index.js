const startBtn = document.getElementById('start-button')
const gamesList = document.querySelectorAll('.games li')
const progressBar = document.getElementById('progress-bar')
const progressWrap = document.getElementById('progress-wrap')
const gamesTitles = [];

gamesList.forEach(game => gamesTitles.push(game.innerText))

let isActiveDownloads = false;
let gameIdx = 0;

let progressMock;
const state = {
  progress: 0
};

function start() {
  isActiveDownloads = true
  changeStartBtn('pause')

  progressMock = setInterval(() => {
    if (state.progress >= 100) {
      stop()
      if (gameIdx < gamesList.length - 1) {
        sayNewGames()
      } else {
        addStatusImage()
        alert('You have downloaded all the games! Enjoy!')
      }
    } else {
      state.progress += 1
      updateProgressText()
      updateProgressBar()
    }
  }, 300);
}

function stop() {
  isActiveDownloads = false;
  changeStartBtn('play')
  progressBar.classList.remove('progress-bar-animated')
  return clearInterval(progressMock);
}

function updateProgressText() {
  gamesList[gameIdx].style.backgroundSize = (`${state.progress}%`)
}

function updateProgressBar() {
  progressWrap.style.visibility = 'visible'
  progressBar.classList.add('progress-bar-animated')
  progressBar.style.width = (`${state.progress}%`)
  progressBar.innerText = `${state.progress}%`
}

function sayNewGames() {
  addStatusImage()

  const answer = confirm(`
    ${gamesList[gameIdx].innerText} has been successfully downloaded!
    Would you like to download next game?`)
  if (answer) {
    gameIdx += 1
    state.progress = 0
    start()
  }
}

function addStatusImage() {
  const successImage = `<i style="color: green; margin-left: 10px;" class="fa fa-check-circle"></i>`;
  gamesList[gameIdx].innerHTML = gamesTitles[gameIdx] + successImage;
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



