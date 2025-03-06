const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(cors()); // CORS 설정 (다른 도메인에서 접근 허용)
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식 파싱
app.use(bodyParser.json()); // JSON 형식 파싱
app.use(express.static(path.join(__dirname, "../public"))); // 정적 파일 제공

// 루트 페이지 제공 (시작 파일 경로 지정)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/main/splash/index.html"), (err) => {
    if (err) {
      console.error("파일을 찾을 수 없습니다:", err);
      res.status(500).send("서버 오류");
    }
  });
});

// 검색 API
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "검색어를 입력하세요." });
  }

  // 미리 정의된 장소 목록
  const places = [

    // 본관 1층
    { name: "학생지원실1", address: "본관 1층" },
    { name: "1-1", address: "본관 1층" },
    { name: "1-2", address: "본관 1층" },
    { name: "1-3", address: "본관 1층" },
    { name: "1-4", address: "본관 1층" },
    { name: "1학년", address: "본관 1층" },

    { name: "택배보관실", address: "본관 1층" },
    { name: "행정지원실", address: "본관 1층" },
    { name: "교장실", address: "본관 1층" },
    { name: "기획회의실", address: "본관 1층" },
    { name: "크리에이티브존", address: "본관 1층" },

    { name: "급식실 입구", address: "본관 1층 외부관" },
    { name: "교직원 급식실", address: "본관 1층 외부관" },

    // 주차장
    { name: "제 1 주차장", address: "정문입구" },
    { name: "제 2 주차장", address: "후문입구 | 정문입구로 쭉 들어오셔서 왼쪽으로 가는 방법도 있습니다." },

    // 본관 2층
    { name: "2-1", address: "본관 2층" },
    { name: "2-2", address: "본관 2층" },
    { name: "2-3", address: "본관 2층" },
    { name: "2-4", address: "본관 2층" },
    { name: "2학년", address: "본관 2층" },
    { name: "학생지원실2", address: "본관 2층" },
    
    { name: "여교사 휴게실", address: "본관 2층" },
    { name: "남교사 휴게실", address: "본관 2층" },
    { name: "SW카페", address: "본관 2층" },
    { name: "일반교무실", address: "본관 2층" },
    { name: "방송실", address: "본관 2층" },

    // 융합관 1층
    { name: "보건실", address: "융합관 1층" },
    { name: "학부모회의실", address: "융합관 1층" },
    { name: "학생자치회실", address: "융합관 1층" },
    { name: "인공지능개발실", address: "융합관 1층" },
    { name: "프로그래밍2실", address: "융합관 1층" },
    { name: "과학실", address: "융합관 1층" },
    { name: "창의디자인실", address: "융합관 1층" },

    // 융합관 2층
    { name: "일반회의실", address: "융합관 2층" },
    { name: "위클래스실", address: "융합관 2층" },
    { name: "객체지향프로그래밍실", address: "융합관 2층" },
    { name: "프로그래밍1실", address: "융합관 2층" },
    { name: "전문교무실", address: "융합관 2층" },
    { name: "학생지도실", address: "융합관 2층" },
    { name: "진로상담실", address: "융합관 2층" },
    { name: "공간-AriSori실", address: "융합관 2층" },
    { name: "아리소리", address: "융합관 2층" },
    { name: "매점", address: "융합관 2층" },

    // 융합관 3층
    { name: "진로활동실", address: "융합관 3층" },
    { name: "학생지원실3", address: "융합관 3층" },
    { name: "3-1", address: "융합관 3층" },
    { name: "3-2", address: "융합관 3층" },
    { name: "3-3", address: "융합관 3층" },
    { name: "3-4", address: "융합관 3층" },
    { name: "3학년", address: "융합관 3층" },
    { name: "기숙사운영부", address: "융합관 3층" },
    { name: "모둠학습실", address: "융합관 3층" },
    { name: "영어교과실", address: "융합관 3층" },
    { name: "창의공작실", address: "융합관 3층" },
    { name: "커뮤니티홀", address: "융합관 3층" },

    // SRC관 1층
    { name: "다목적홀", address: "SRC관 1층" },
    { name: "음악실", address: "SRC관 1층" },
    { name: "강사대기실", address: "SRC관 1층" },

    // SRC관 2층
    { name: "글가람", address: "SRC관 2층" },
    { name: "도서관", address: "SRC관 2층" },
    { name: "글누리", address: "SRC관 2층" },
    { name: "헬스장", address: "SRC관 2층" },
    { name: "BSSMGYM", address: "SRC관 2층" },
    { name: "IoT자동제어실", address: "SRC관 2층" },
    { name: "마이크로프로세서실", address: "SRC관 2층" },
    { name: "임베디드시스템실", address: "SRC관 2층" },
    { name: "임베디드S과 연구실", address: "SRC관 2층" },

    // SRC관 3층
    { name: "베르실", address: "SRC관 3층 및 4층" },
    { name: "산학협력부", address: "SRC관 3층, 커뮤니티홀 앞" },
    { name: "생활지원실", address: "SRC관 3층, 커뮤니티홀 앞" },

    // 기숙사
    { name: "정독실", address: "후문 쪽 가장 안쪽 건물. 1층에 위치" },
    { name: "독서실", address: "후문 쪽 가장 안쪽 건물. 1층에 위치" },
    { name: "A동 기숙사", address: "후문 쪽 가장 안쪽 건물. 2층(202~219호) 3층(303~319호)" },
    { name: "B동 기숙사", address: "SRC관 3층(B301~B334호) 4층(B401~B434호)" },
  ];

  // 검색어에서 공백을 제거하고 소문자로 변환하여 비교
  const normalizedQuery = query.replace(/\s+/g, "").toLowerCase();

  // 검색어와 일치하는 장소들 찾기 (글자가 3개 이상 같으면 포함)
  const results = places.filter((place) => {
    const normalizedPlaceName = place.name.replace(/\s+/g, "").toLowerCase();
    let matchCount = 0;
    for (let i = 0; i < normalizedQuery.length; i++) {
      if (normalizedPlaceName.includes(normalizedQuery[i])) {
        matchCount++;
      }
    }
    return matchCount >= 3;
  });

  // 검색 결과 반환
  res.json({ results });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});