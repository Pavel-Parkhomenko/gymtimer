const curTime = document.querySelector('.time-current')
const mainTime = document.querySelector('.time-main')
const body = document.querySelector('body')
// const timerSvgPath = document.querySelector('#timer-svg path')

let secondsMain = 0
let secondsCur = 0
let intervalIdCur = null
let intervalIdMain = null

const maxSeconds = 60

const OPT = Object.freeze({
  main: 'MAIN',
  cur: 'CURRENT',
})

function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0')
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

function updateDisplay(option) {
  if (option == OPT.cur) {
    curTime.textContent = formatTime(secondsCur)
    updateColorSvg(secondsCur)
  }
  if (option == OPT.main) mainTime.textContent = formatTime(secondsMain)
}

function tick(option) {
  if (option == OPT.cur) secondsCur++
  if (option == OPT.main) secondsMain++
  updateDisplay(option)
}

function startTimerMain() {
  if (intervalIdMain !== null) return
  intervalIdMain = setInterval(() => tick(OPT.main), 1000)
}

function startTimeCur() {
  if (intervalIdCur !== null) return
  intervalIdCur = setInterval(() => tick(OPT.cur), 1000)
}

function stopTimerCur() {
  clearInterval(intervalIdCur)
  intervalIdCur = null
}

function resetTimerCur() {
  // stopTimerCur()
  secondsCur = 0
  updateDisplay(OPT.cur)
}

function resetTimerMain() {
  // stopTimerCur()
  secondsMain = 0
  updateDisplay(OPT.main)
}

body.addEventListener('click', () => {
  if (intervalIdCur !== null) resetTimerCur()
})

body.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    event.preventDefault()

    if (intervalIdCur !== null) resetTimerCur()
  } else if (event.altKey && event.code === 'KeyR') {
    resetTimerMain()
    resetTimerCur()
  }
})

function updateColorSvg(seconds) {
  const progress = Math.min(seconds / maxSeconds, 1)

  const hue = 120 - progress * 120

  // timerSvgPath.setAttribute('stroke', `hsl(${hue}, 100%, 50%)`)
  curTime.style.color = `hsl(${hue}, 100%, 50%)`
}

startTimeCur()
startTimerMain()
