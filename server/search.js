const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // cheerio 패키지 추가

function search(query, callback) {
    const basePath = path.join(__dirname, "../public/building"); // 검색할 폴더
    let results = [];

    function searchFiles(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                searchFiles(fullPath); // 하위 폴더도 검색
            } else if (file.endsWith(".html")) {
                // HTML 파일만 처리
                const content = fs.readFileSync(fullPath, "utf-8");
                const $ = cheerio.load(content); // cheerio로 HTML 파싱

                $('h2').each((index, element) => {
                    const h2Text = $(element).text().trim();
                    if (h2Text.includes(query)) {
                        results.push({
                            file: fullPath.replace(basePath, ""), // 검색된 HTML 파일 경로
                            h2Text: h2Text // 해당 <h2>의 내용
                        });
                    }
                });
            }
        });
    }

    searchFiles(basePath);
    callback(results);
}

module.exports = search;