const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 글 저장소 (메모리 - 추후 DB로 교체 가능)
let posts = [];

/*
  게시글 구조
  {
    id: string,
    title: string,
    content: string,
    topic: string,
    author: string,
    createdAt: Date,
    views: number,
    likes: number
  }
*/

// 글 목록 조회 (주제 필터 가능)
app.get("/api/posts", (req, res) => {
  const { topic } = req.query;

  let result = posts;

  if (topic) {
    result = posts.filter(p => p.topic === topic);
  }

  res.json(result);
});

// 특정 글 조회 (조회수 증가)
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);

  if (!post) {
    return res.status(404).json({ error: "글을 찾을 수 없습니다." });
  }

  post.views += 1;
  res.json(post);
});

// 글 작성
app.post("/api/posts", (req, res) => {
  const { title, content, topic, author } = req.body;

  if (!title || !content || !topic) {
    return res.status(400).json({
      error: "제목, 내용, 주제를 모두 입력해야 합니다."
    });
  }

  const newPost = {
    id: crypto.randomUUID(),
    title,
    content,
    topic,
    author: author || "anonymous",
    createdAt: new Date(),
    views: 0,
    likes: 0
  };

  posts.unshift(newPost); // 최신글 위로
  res.json(newPost);
});

// 글 삭제 (id 기반)
app.delete("/api/posts/:id", (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "글을 찾을 수 없습니다." });
  }

  posts.splice(index, 1);
  res.json({ success: true });
});

// 좋아요 증가
app.patch("/api/posts/:id/like", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);

  if (!post) {
    return res.status(404).json({ error: "글을 찾을 수 없습니다." });
  }

  post.likes += 1;
  res.json({ likes: post.likes });
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/community", (req, res) => {
  res.sendFile(path.join(__dirname, "community.html"));
});

app.get("/write.html", (req, res) => {
  res.sendFile(path.join(__dirname, "write.html"));
});

app.get("/post.html", (req, res) => {
  res.sendFile(path.join(__dirname, "post.html"));
});

module.exports = app;
