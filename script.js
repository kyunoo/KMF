const path = window.location.pathname;

/* ------------------ COMMUNITY ------------------ */
if (path.includes("community")) {

    let currentTopic = "전체";
    let currentPage = 1;
    const postsPerPage = 10;

    function getPosts() {
        return JSON.parse(localStorage.getItem("posts")) || [];
    }

    window.setTopic = function(topic) {
        currentTopic = topic;
        currentPage = 1;
        render();
    }

    function getFilteredPosts() {
        const posts = getPosts();
        if (currentTopic === "전체") {
            return posts.filter(p => p.topic !== "공지사항");
        }
        return posts.filter(p => p.topic === currentTopic);
    }

    function render() {
        const list = document.getElementById("postList");
        const pagination = document.getElementById("pagination");
        if (!list) return;

        list.innerHTML = "";
        pagination.innerHTML = "";

        const filtered = getFilteredPosts();

        if (filtered.length === 0) {
            list.innerHTML = "<p>아직 글이 올라오지 않았습니다.</p>";
            return;
        }

        const totalPages = Math.ceil(filtered.length / postsPerPage);
        const start = (currentPage - 1) * postsPerPage;
        const pagePosts = filtered.slice(start, start + postsPerPage);

        pagePosts.forEach(post => {
            const row = document.createElement("div");
            row.className = "post-row";
            row.innerHTML = `
                <div class="post-date">${post.date}</div>
                <div class="post-title">${post.title}</div>
            `;
            row.onclick = () => {
                localStorage.setItem("selectedPostId", post.id);
                location.href = "view.html";
            };
            list.appendChild(row);
        });
    }

    render();
}

/* ------------------ WRITE ------------------ */
if (path.includes("write")) {

    const textarea = document.getElementById("content");
    const counter = document.getElementById("counter");

    if (textarea) {
        textarea.addEventListener("input", () => {
            counter.textContent = textarea.value.length + " / 500";
        });
    }

    window.confirmExit = function() {
        if (confirm("작성하던 글이 삭제됩니다. 나가시겠습니까?")) {
            location.href = "community.html";
        }
    }

    window.submitPost = function() {

        const title = document.getElementById("title").value.trim();
        const topic = document.getElementById("topic").value;
        const content = textarea.value.trim();
        const imageInput = document.getElementById("image");

        if (!title || !content) {
            alert("제목과 내용을 입력하세요.");
            return;
        }

        if (topic === "공지사항") {
            const pw = prompt("관리자 암호를 입력하세요.");
            if (pw !== "1259") {
                alert("암호가 틀렸습니다.");
                return;
            }
        }

        const reader = new FileReader();

        reader.onload = function(e) {

            let posts = JSON.parse(localStorage.getItem("posts")) || [];

            const newPost = {
                id: Date.now(),
                title,
                topic,
                content,
                image: imageInput.files[0] ? e.target.result : null,
                date: new Date().toLocaleDateString()
            };

            posts.unshift(newPost);
            localStorage.setItem("posts", JSON.stringify(posts));
            location.href = "community.html";
        };

        if (imageInput.files[0]) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            reader.onload({ target: { result: null } });
        }
    }
}

/* ------------------ VIEW ------------------ */
if (path.includes("view")) {

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postId = Number(localStorage.getItem("selectedPostId"));
    const post = posts.find(p => p.id === postId);

    if (!post) {
        alert("글을 찾을 수 없습니다.");
        location.href = "community.html";
    }

    document.getElementById("title").textContent = post.title;
    document.getElementById("date").textContent = post.date;

    let contentHTML = `<p>${post.content.replace(/\n/g, "<br>")}</p>`;
    if (post.image) {
        contentHTML += `<img src="${post.image}">`;
    }

    document.getElementById("contentArea").innerHTML = contentHTML;

    window.deletePost = function() {
        const pw = prompt("관리자 암호를 입력하세요.");
        if (pw !== "1259") {
            alert("암호가 틀렸습니다.");
            return;
        }
        posts = posts.filter(p => p.id !== postId);
        localStorage.setItem("posts", JSON.stringify(posts));
        location.href = "community.html";
    }
}
