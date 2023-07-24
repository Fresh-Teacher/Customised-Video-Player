// Get elements from the DOM
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progress_bar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const sliders = player.querySelectorAll('.player_slider');
const skip_buttons = player.querySelectorAll('[data-skip]');
const fsBtn = player.querySelector('.fullScreenBtn');
progress_bar.style.flexBasis = `0%`;

// Function to implement toggle play/pause feature
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Function to update the play/pause button whenever video gets paused, and event listener is fired
function updateButton() {
    if (video.paused) {
        toggle.textContent = '►';
    } else {
        toggle.textContent = '❚ ❚';
    }
}

// Function to skip forward and backward in the video
function skipping() {
    skipTime = parseFloat(this.dataset.skip);
    video.currentTime += skipTime;
}

// Function to update the video when slider value changes
function handleSliderUpdate() {
    video[this.name] = this.value;
}

// Function to update the progress bar of the video
function handleProgressBarUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progress_bar.style.flexBasis = `${percent}%`;
}

// Function to scrub in the progress bar of the video
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Check if Fullscreen API is supported by the browser
const fullScreenEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;

// Function to request fullscreen mode
function requestFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

// Function to exit fullscreen mode
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Function to handle fullscreen button click
function fullScreen() {
    if (fullScreenEnabled) {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
            requestFullscreen(player);
        } else {
            exitFullscreen();
        }
    }
}

// Hook up the event listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skip_buttons.forEach(function (button) {
    button.addEventListener('click', skipping);
});

sliders.forEach(function (slider) {
    slider.addEventListener('change', handleSliderUpdate);
    slider.addEventListener('mousemove', handleSliderUpdate);
});

video.addEventListener('timeupdate', handleProgressBarUpdate);

progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fsBtn.addEventListener('click', fullScreen);