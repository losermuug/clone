function loadComponent(id, path) {
  const target = document.getElementById(id);
  if (!target) return;

  fetch(path)
    .then((res) => {
      if (!res.ok) throw new Error(`Component load failed: ${path}`);
      return res.text();
    })
    .then((data) => {
      target.innerHTML = data;

      if (id === "header") {
        fixPublicComponentPaths(id);
        initHeaderState();
      }

      if (id === "footer") {
        fixPublicComponentPaths(id);
      }

      if (id === "userHeader") {
        fixUserComponentPaths(id);
        initUserHeaderState();
      }

      if (id === "userFooter") {
        fixUserComponentPaths(id);
      }

      if (id === "adminSidebar") {
        initAdminState();
      }

      if (id === "adminTopbar") {
        initAdminTopbar();
      }
    })
    .catch((err) => console.error(err));
}

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

function isAdminPage() {
  return getCurrentPath().includes("/pages/admin/");
}

function getHomePath() {
  return isRootPage() ? "index.html" : "../../index.html";
}

// ===============================
// PATH FIX
// ===============================
function fixPublicComponentPaths(id) {
  const element = document.getElementById(id);
  if (!element) return;

  if (isRootPage()) {
    element.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("../../")) {
        link.setAttribute("href", href.replace("../../", ""));
      }
    });

    element.querySelectorAll("img[src]").forEach((img) => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("../../")) {
        img.setAttribute("src", src.replace("../../", ""));
      }
    });
  }
}

function fixUserComponentPaths(id) {
  const element = document.getElementById(id);
  if (!element || !isUserPage()) return;

  element.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href.startsWith("../../pages/user/")) {
      link.setAttribute("href", href.replace("../../pages/user/", ""));
    } else if (href.startsWith("../../pages/auth/")) {
      link.setAttribute("href", href.replace("../../pages/auth/", "../auth/"));
    }
  });
}

// ===============================
// USER HEADER
// ===============================
function initHeaderState() {
  const guestActions = document.getElementById("guestActions");
  const userActions = document.getElementById("userActions");
  const navUsername = document.getElementById("navUsername");
  const logoutBtn = document.getElementById("logoutBtn");

  const savedUser = localStorage.getItem("user");
  const savedRole = localStorage.getItem("role");

  if (savedUser && savedRole === "user") {
    guestActions?.classList.add("hidden");
    userActions?.classList.remove("hidden");
    userActions?.classList.add("flex");

    if (navUsername) navUsername.textContent = savedUser;
  } else {
    guestActions?.classList.remove("hidden");
    userActions?.classList.add("hidden");
    userActions?.classList.remove("flex");
  }

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = getHomePath();
  });
}

// ===============================
// ADMIN STATE
// ===============================
function initAdminState() {
  // Development үед admin page шууд харагдана.
  // Login руу автоматаар үсрүүлэхгүй.

  if (!localStorage.getItem("role")) {
    localStorage.setItem("role", "admin");
  }

  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", "Admin");
  }
}

function initAdminTopbar() {
  const adminName = document.getElementById("adminName");
  const logoutBtn = document.getElementById("adminLogout");

  const user = localStorage.getItem("user") || "Admin";

  if (adminName) {
    adminName.textContent = user;
  }

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "../../index.html";
  });
}

// ===============================
// USER HEADER OPTIONAL
// ===============================
function initUserHeaderState() {
  const name = localStorage.getItem("user");
  const el = document.getElementById("userName");

  if (el && name) {
    el.textContent = name;
  }
}