const express = require("express");
const path = require("path");
const search = require("./search"); // 검색 기능 가져오기

const app = express();
const PORT = 3000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "../public")));

// 검색 API
app.get("/search", (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "검색어를 입력하세요." });
    }

    search(query, (results) => {
        res.json(results);
    });
});

// 루트 경로 제공
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "../public/main/splash/index.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("파일을 찾을 수 없습니다:", err);
            res.status(500).send("서버 오류");
        }
    });
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});