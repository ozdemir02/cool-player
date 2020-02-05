document.addEventListener("DOMContentLoaded", function () {

  var Base64 = "basic ZjFlYmQ5YmRjMTVlNDhlMGIxYmNmZjhiNmY0NmNjZjA6ZTFmZjNkNDhjMDRiNGIzNGFjYzZkMmYyMGQxYmNjMDY=";
  var scope = "user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing streaming";

  fetch('https://accounts.spotify.com/api/token', {

    method: 'post',
    body: "grant_type=client_credentials&scope=".concat(scope),
    headers: {
      'Authorization': Base64,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

  }).then(function (res) {

    return res.json();

  }).then(function (json) { 
    
    let shuffleButton = document.querySelector(".functions__shuffle")
    let backButton = document.querySelector(".functions__back")
    let playButton = document.querySelector(".functions__play")
    let nextButton = document.querySelector(".functions__forward")
    let repeatButton = document.querySelector(".functions__repeat")

    let music = document.querySelector(".container__player");

    let mDuration = music.duration;

    document.querySelector(".container__end").textContent = Math.floor(mDuration / 60) + ":" + Math.floor(mDuration % 60);

   setInterval(() => {
      let currentTimeNew = Math.floor(music.currentTime % 60 )
      let currentTimeMinute = Math.floor(music.currentTime / 60)
      if (currentTimeNew < 10) {
        document.querySelector(".container__start").textContent = currentTimeMinute + ":" + "0" + currentTimeNew
      } else {
        document.querySelector(".container__start").textContent = currentTimeMinute + ":" + currentTimeNew
      }

   }, 500);

    playButton.addEventListener("click", function() {
      if (music.paused) {
        music.play();
        playButton.setAttribute("src", "assets/images/pause.svg")
      } else {
        music.pause();
        playButton.setAttribute("src", "assets/images/play.svg")
      }
    })

    
  let duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
  let playhead = document.querySelector(".slider__playhead"); // playhead
  let timeline = document.querySelector(".container__slider"); // timeline
  let progressBar = document.querySelector(".slider__progress");

  let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

  music.addEventListener("timeupdate", timeUpdate, false);

  timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
  }, false);

  function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
  }

  playhead.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  let onplayhead = false;

  function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
  }

  function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
  }

    function timeUpdate() {
      var playPercent = timelineWidth * (music.currentTime / duration);
      playhead.style.marginLeft = playPercent + "px";
      if (music.currentTime == duration) {
      }
  }

  function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
  }

    function getPosition(el) {
      return el.getBoundingClientRect().left;
    }

    setInterval(() => {
      progressBar.style.width = (parseInt(playhead.style.marginLeft.replace(/px/,""))+5)+"px";
    }, 10);
    
  }, false);

});