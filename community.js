let posts = []; // 글 목록 저장
let currentPage = 1;
let postsPerPage = 10;

function goWrite() {
  window.location.href = "write.html";
}

function goHome() {
  window.location.href = "index.html";
}

function submitPost() {
  let topic = document.getElementById("topic").value;
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  if(topic === "공지사항") {
    let password = prompt("공지사항은 관리자만 작성할 수 있습니다. 관리자 암호를 입력하세요.");
    if(password !== "1259") {
      alert("암호가 틀렸습니다.");
      return;
    }
  }

  if(content.length > 500) {
    alert("내용은 최대 500글자까지 가능합니다.");
    return;
  }

  let newPost = {
    title: title,
    content: content,
    date: new Date().toISOString().slice(0,10),
    topic: topic,
    author: "익명" + (posts.length+1)
  };
  posts.push
