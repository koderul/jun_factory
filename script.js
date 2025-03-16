document.addEventListener("DOMContentLoaded", function () {
  const content = document.getElementById("content");

  function loadContent() {
    const hash = window.location.hash.substring(1) || "home"; // 기본 페이지 설정
    const page = hash === "home" ? "index.html" : `pages/${hash}.html`; // 해당하는 HTML 파일을 불러옴

    fetch(page)
      .then((response) => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then((html) => {
        content.innerHTML = html;
      })
      .catch(() => {
        content.innerHTML =
          "<h2>404 Not Found</h2><p>해당 페이지를 찾을 수 없습니다.</p>";
      });
  }

  window.addEventListener("hashchange", loadContent);
  loadContent(); // 처음 로딩할 때 실행
});
