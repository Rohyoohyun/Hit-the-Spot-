document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("input[type='text']");

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                fetch(`/search?q=${query}`)
                    .then(response => response.json())
                    .then(results => {
                        console.log(results); // 검색된 결과를 콘솔에 출력
                        displayResults(results);
                    })
                    .catch(error => console.error("검색 오류:", error));
            }
        }
    });

    // 검색 결과를 화면에 출력하고, 콘솔에 결과를 출력하는 함수
    function displayResults(results) {
        const resultsContainer = document.getElementById("results"); // 검색 결과를 표시할 컨테이너
        resultsContainer.innerHTML = ''; // 기존 내용 초기화

        if (results.length === 0) {
            resultsContainer.innerHTML = "<p>검색된 결과가 없습니다.</p>";
            console.log("검색된 결과가 없습니다.");
        } else {
            // 검색된 결과를 <h2>로 표시하고 클릭 시 해당 경로로 이동
            results.forEach(result => {
                const h2 = document.createElement("h2");
                h2.textContent = result.h2Text; // 검색된 <h2> 텍스트

                // 클릭 시 해당 폴더로 이동
                h2.onclick = function () {
                    window.location.href = `/public/building${result.file}`; // 해당 경로로 이동
                };

                // 결과를 컨테이너에 추가
                resultsContainer.appendChild(h2);

                // 검색된 결과를 콘솔에 출력
                console.log(`검색된 <h2>: ${result.h2Text}`);
            });
        }
    }
});