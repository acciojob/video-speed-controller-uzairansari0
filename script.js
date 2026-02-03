const inputs = document.querySelectorAll('.controls input');
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const sliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');


function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
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

sliders.forEach(slider => slider.addEventListener('input', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
 
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
