document.addEventListener("DOMContentLoaded", function () {
  const content = document.getElementById("content");
  const backButton = document.getElementById("back-button");

  const aside = document.querySelector("aside");
  const menuButton = document.querySelector(".menu-button");
  const closeButton = document.querySelector(".close-button");

  menuButton.addEventListener("click", function () {
    aside.classList.add("aside-open");
  });

  closeButton.addEventListener("click", function () {
    aside.classList.remove("aside-open");
  });

  function loadContent() {
    const hash = window.location.hash.substring(1) || "home"; // 기본 페이지 설정
    const page = `pages/${hash}.html`;

    fetch(page)
      .then((response) => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then((html) => {
        content.innerHTML =
          `<button id="back-button" class="back-button" style="display: ${
            hash === "home" ? "none" : "block"
          };">⬅ 뒤로가기</button>` + html;
        attachBackButton();
      })
      .catch(() => {
        content.innerHTML =
          "<h2>404 Not Found</h2><p>해당 페이지를 찾을 수 없습니다.</p>";
      });
  }

  function attachBackButton() {
    const backBtn = document.getElementById("back-button");
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.hash = "";
        }
      });
    }
  }

  window.addEventListener("hashchange", loadContent);
  loadContent();
});
