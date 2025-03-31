document.addEventListener("DOMContentLoaded", function () {
  const content = document.getElementById("content");
  const backButton = document.getElementById("back-button");

  const aside = document.querySelector("aside");
  const menuButton = document.querySelector(".menu-button");
  const closeButton = document.querySelector(".close-button");
  const overlay = document.querySelector(".overlay");
  const navLinks = document.querySelectorAll("aside nav a");

  function openMenu() {
    aside.classList.add("aside-open");
    overlay.classList.add("active");
  }

  function closeMenu() {
    aside.classList.remove("aside-open");
    overlay.classList.remove("active");
  }

  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      setTimeout(closeMenu, 200); // 부드러운 전환을 위해 살짝 지연
    });
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
