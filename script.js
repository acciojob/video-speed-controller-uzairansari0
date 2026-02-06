const video = document.querySelector('.player__video');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress'); // first progress bar
const progressFilled = document.querySelector('.progress__filled');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');

/* Play / Pause */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

/* Progress bar */
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Volume & Playback Speed */
function handleRangeUpdate() {
  video[this.name] = this.value;
}

/* Skip buttons */
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

/* Event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

volume.addEventListener('input', handleRangeUpdate);
playbackRate.addEventListener('input', handleRangeUpdate);

skipButtons.forEach(button =>
  button.addEventListener('click', skip)
);

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));