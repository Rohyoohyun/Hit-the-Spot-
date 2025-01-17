window.onload = function() {
    // 스플래시 화면 요소
    const splashScreen = document.getElementById('splash-screen');
    const sidenav = document.getElementById('mySidenav');
    setTimeout(function() {
        splashScreen.style.display = 'none';  // 스플래시 화면 숨기기
        sidenav.style.display = 'block';  // 사이드바 보이기
    }, 800); 
};

// 사이드바 열기/닫기 토글 함수
function toggleNav() {
    const sidenav = document.getElementById("mySidenav");
    const main = document.getElementById("main");

    // 사이드바가 열려 있으면 닫고, 닫혀 있으면 열기
    if (sidenav.classList.contains("open")) {
        sidenav.classList.remove("open");
        main.style.marginLeft = "5%";  // 사이드바가 닫히면 메인 내용 원위치
    } else {
        sidenav.classList.add("open");
        main.style.marginLeft = "250px";  // 사이드바가 열리면 메인 내용 밀기
    }
}