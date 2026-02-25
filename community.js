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

  alert("글이 등록되었습니다.");
  window.location.href = "community.html";
}

function cancelWrite() {
  if(confirm("작성하던 글이 삭제됩니다. 나가시겠습니까?")) {
    window.location.href = "community.html";
  }
}

function editPost() {
  let password = prompt("수정 권한 암호를 입력하세요.");
  if(password === "1259") {
    alert("수정 가능합니다.");
  } else {
    alert("권한이 없습니다.");
  }
}

function deletePost() {
  let password = prompt("삭제 권한 암호를 입력하세요.");
  if(password === "1259") {
    alert("삭제되었습니다.");
    window.location.href = "community.html";
  } else {
    alert("권한이 없습니다.");
  }
}

// 페이지네이션 예시
let posts = []; // 서버에서 받아온다고
