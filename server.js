const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 글 저장소 (메모리)
let posts = [];

// 글 목록 가져오기 (주제별)
app.get("/api/posts", (req, res) => {
  const topic = req.query.topic;
  if (topic) {
    const filtered = posts.filter(p => p.topic === topic);
    res.json(filtered);
  } else {
    res.json(posts);
  }
});

// 글 작성
app.post("/api/posts", (req, res) => {
  const { title, content, topic } = req.body;
  if (!title || !content || !topic) {
    return res.status(400).json({ error: "제목, 내용, 주제를 모두 입력해야 합니다" });
  }
  posts.push({ title, content, topic });
  res.json({ success: true });
});

// 글 삭제
app.delete("/api/posts/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (posts[index]) {
    posts.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "글을 찾을 수 없습니다" });
  }
});

// 정적 파일 제공 (index.html, community.html 등)
app.use(express.static(path.join(__dirname)));

// 루트("/") 접속 시 index.html 보여주기
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 커뮤니티 페이지 라우트 추가
app.get("/community", (req, res) => {
  res.sendFile(path.join(__dirname, "community.html"));
});

// Vercel에서 실행할 때는 listen 대신 export
module.exports = app;

const path = require("path");

// write.html 라우트 직접 지정
app.get("/write.html", (req, res) => {
  res.sendFile(path.join(__dirname, "write.html"));
});
