let current = 0;
let slides = document.querySelectorAll(".slide");
let autoSlide;

// 슬라이드 표시
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

// 다음
function nextSlide() {
  current++;
  if (current >= slides.length) current = 0;
  showSlide(current);
  resetAuto();
}

// 이전
function prevSlide() {
  current--;
  if (current < 0) current = slides.length - 1;
  showSlide(current);
  resetAuto();
}

// 자동 슬라이드 (5초)
function startAuto() {
  autoSlide = setInterval(nextSlide, 5000);
}

// 자동 슬라이드 리셋
function resetAuto() {
  clearInterval(autoSlide);
  setTimeout(startAuto, 3000); // 3초 후 다시 자동 시작
}

// 버튼 기능 (임시)
function goCommunity() { alert("커뮤니티 페이지 예정"); }
function goHistory() { alert("뮌헨의 역사 페이지 예정"); }
function goNews() { alert("뮌뉴스 페이지 예정"); }
function goFanInstagram() { alert("팬페이지 인스타 연결 예정"); }
function goOfficialInstagram() { alert("공식 인스타 연결 예정"); }

// 시작
startAuto();
