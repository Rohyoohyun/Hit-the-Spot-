const searchInput = document.getElementById('searchInput');
const resultModal = document.getElementById('resultModal');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        
        if (query) {
            // 서버에 검색어를 요청
            fetch(`/search?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    displayResults(data.results); // 서버에서 받아온 결과를 displayResults로 전달
                })
                .catch(error => {
                    console.error('검색 오류:', error);
                });
        }
    }
});

// 검색 결과를 모달에 표시하는 함수
function displayResults(results) {
    searchResults.innerHTML = ''; // 이전 결과 초기화
    if (results.length > 0) {
        results.forEach(result => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${result.name}</strong><br>
                ${result.address}<br>
            `;
            searchResults.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = '결과가 없습니다.';
        searchResults.appendChild(li);
    }
    openModal();
}

// 모달 열기
function openModal() {
    resultModal.style.display = 'block';
}

// 모달 닫기
function closeModal() {
    resultModal.style.display = 'none';
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target === resultModal) {
        closeModal();
    }
};
