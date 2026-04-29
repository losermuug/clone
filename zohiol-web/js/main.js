  // ===============================
  // PATH HELPERS
  // ===============================
  function getCurrentPath() {
    return window.location.pathname.replace(/\\/g, "/").toLowerCase();
  }

  function isRootPage() {
    const path = getCurrentPath();
    return path.endsWith("/index.html") || path.endsWith("index.html") || path === "/";
  }

  function isUserPage() {
    return getCurrentPath().includes("/pages/user/");
  }

  function isAuthPage() {
    return getCurrentPath().includes("/pages/auth/");
  }

  function getUserPagePath(fileName) {
    if (isRootPage()) return `pages/user/${fileName}`;
    if (isUserPage()) return `${fileName}`;
    if (isAuthPage()) return `../user/${fileName}`;
    return `pages/user/${fileName}`;
  }

  function getAuthPagePath(fileName) {
    if (isRootPage()) return `pages/auth/${fileName}`;
    if (isUserPage()) return `../auth/${fileName}`;
    if (isAuthPage()) return `${fileName}`;
    return `pages/auth/${fileName}`;
  }

  // ===============================
  // ROUTES
  // ===============================
  function goDetail(id) {
    const target = `${getUserPagePath("detail.html")}?id=${id}`;
    console.log("goDetail =>", target);
    window.location.href = target;
  }

  function goRead(id, chapter = 1) {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!user || role !== "user") {
      const loginTarget = getAuthPagePath("login.html");
      console.log("goRead => login", loginTarget);
      window.location.href = loginTarget;
      return;
    }

    const readTarget = `${getUserPagePath("read.html")}?id=${id}&chapter=${chapter}`;
    console.log("goRead =>", readTarget);
    window.location.href = readTarget;
  }

  // ===============================
  // SEARCH
  // ===============================
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const keyword = searchInput.value.trim();

          if (!keyword) {
            window.location.href = getUserPagePath("novels.html");
            return;
          }

          window.location.href =
            `${getUserPagePath("novels.html")}?search=${encodeURIComponent(keyword)}`;
        }
      });
    }
  });