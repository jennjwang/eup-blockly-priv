const TIME_LIMIT = 5;
let timerInterval = null;

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

function formatTime(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    if (timeLeft == 0) {
      clearInterval(timerInterval);
      document.getElementById("modal").style.display = "block";
    }

    // The time left label is updated
    document.getElementById("timer-label").innerHTML = formatTime(timeLeft);
  }, 1000);
}

document.getElementById("clock").innerHTML = `
<div class="timer">
  <span id="timer-label" class="timer_label">
    ${formatTime(timeLeft)}
  </span>
</div>
`;

startTimer();
