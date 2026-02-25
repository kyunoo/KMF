// 배경 슬라이드
let bgIndex = 0;
let backgrounds = document.querySelectorAll(".background-slider img");
function showBackground(i) {
  backgrounds.forEach(bg => bg.classList.remove("active"));
  backgrounds[i].classList.add("active");
}
function nextBackground() {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  showBackground(bgIndex);
}
setInterval(nextBackground, 7000); // 7초마다 배경 변경

// 선수 사진 슬라이드
let playerIndex = 0;
let players = document.querySelectorAll(".player-slide");
let autoPlayer;

function showPlayer(i) {
  players.forEach(p => p.classList.remove("active"));
  players[i].classList.add("active");
}

function nextPlayer() {
  playerIndex = (playerIndex + 1) % players.length;
  showPlayer(playerIndex);
  resetAuto();
}

function prevPlayer() {
  playerIndex = (playerIndex - 1 + players.length) % players.length;
  showPlayer(playerIndex);
  resetAuto();
}

function startAuto() {
  autoPlayer = setInterval(nextPlayer, 5000);
}

function resetAuto() {
  clearInterval(autoPlayer);
  setTimeout(start
