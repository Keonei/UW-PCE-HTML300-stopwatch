// button controls
const start = document.querySelector('button.start');
const stop = document.querySelector('button.stop');
const lap = document.querySelector("button.lap");
const reset = document.querySelector("button.reset");

// DOM element that I need to update
const labList = document.querySelector('#labList');
const stopwatchTime = document.querySelector('#stopwatchTime');

// constans that shouldn't ever change
const laps = [];
const intervalRate = 10; // update the stopwatch every 10 milliseconds

// values that will chang pretty often
let intervalId = null;
let rawTime = 0;

// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}

// start the stopwatch by creatinga a new interval
// we'll store the interval id so we can manipulate the interval later
function stopwatchStart (event) {
  event.preventDefault()

  // every 10 milliseconds, update the stopwatch
  intervalId = setInterval(stopwatchUpdate, intervalRate)
}

function stopwatchStop (event) {
  event.preventDefault()

  //clear the interval
  clearInterval(intervalId)
}

//
function stopwatchLap() {
  event.preventDefault();

  laps.push(formatTime(rawTime));

  lapList.innerHTML = "";
  for (var i = 0; i < laps.length; i++) {
    var ul = document.createElement("ul");
    var currentLap = laps[i];
    var li = document.createElement("li");
    li.innerHTML = currentLap;
    ul.appendChild(li);
    lapList.appendChild(ul);
  }
}

function stopwatchReset () {
  event.preventDefault();
  clearInterval(intervalId);
  // clear the laps 
  laps.length = 0;
  lapList.innerHTML = "";

  // set the timer back to 0
  rawTime = 0;
  stopwatchTime.innerHTML = formatTime(rawTime);
}

// adds the interval to the stopwatch time since the last "tick"
// then update the DOM with the new stopwatch time
function stopwatchUpdate () {
  rawTime += intervalRate
  stopwatchTime.innerHTML = formatTime(rawTime)
}

// stops the stopwatch by clearing the interval
function stopwatchStop (event) {
  event.preventDefault()
  console.log('stopped!')

  clearInterval(intervalId)
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')

  start.addEventListener("click", stopwatchStart)
  stop.addEventListener("click", stopwatchStop)
  lap.addEventListener("click", stopwatchLap)
  reset.addEventListener("click", stopwatchReset)
})
