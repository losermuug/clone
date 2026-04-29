// js/layout.js

async function loadMaster() {
  const headerTarget = document.getElementById("header");
  const footerTarget = document.getElementById("footer");

  if (!headerTarget || !footerTarget) return;

  try {
    const masterPath = getMasterPath();
    const response = await fetch(masterPath);

    if (!response.ok) {
      throw new Error("master.html олдсонгүй: " + masterPath);
    }

    const html = await response.text();

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const header = temp.querySelector("header");
    const mobileMenu = temp.querySelector("#mobileMenu");
    const footer = temp.querySelector("footer");

    headerTarget.replaceWith(header);

    if (mobileMenu) {
      header.insertAdjacentElement("afterend", mobileMenu);
    }

    footerTarget.replaceWith(footer);

    fixMasterPaths();
    initHeaderAuth();
    initSearch();
    initMobileMenu();
  } catch (error) {
    console.error("Master layout алдаа:", error);
  }
}

function getCurrentPath() {
  return window.location.pathname.replace(/\\/g, "/").toLowerCase();
}

function isRootPage() {
  const path = getCurrentPath();
  return path.endsWith("/index.html") || path === "/" || path.endsWith("/");
}

function isUserPage() {
  return getCurrentPath().includes("/pages/user/");
}

function isAuthPage() {
  return getCurrentPath().includes("/pages/auth/");
}

function getMasterPath() {
  if (isRootPage()) return "./master.html";
  if (isUserPage()) return "../../master.html";
  if (isAuthPage()) return "../../master.html";

  return "./master.html";
}

function fixMasterPaths() {
  const root = document.body;

  root.querySelectorAll("[data-link]").forEach((link) => {
    const key = link.dataset.link;

    const paths = {
      home: {
        root: "index.html",
        user: "../../index.html",
        auth: "../../index.html"
      },
      novels: {
        root: "pages/user/novels.html",
        user: "novels.html",
        auth: "../user/novels.html"
      },
      "new-novels": {
        root: "pages/user/new-novels.html",
        user: "new-novels.html",
        auth: "../user/new-novels.html"
      },
      popular: {
        root: "pages/user/popular.html",
        user: "popular.html",
        auth: "../user/popular.html"
      },
      "new-chapters": {
        root: "pages/user/new-chapters.html",
        user: "new-chapters.html",
        auth: "../user/new-chapters.html"
      },
      profile: {
        root: "pages/user/profile.html",
        user: "profile.html",
        auth: "../user/profile.html"
      },
      login: {
        root: "pages/auth/login.html",
        user: "../auth/login.html",
        auth: "login.html"
      },
      register: {
        root: "pages/auth/register.html",
        user: "../auth/register.html",
        auth: "register.html"
      }
    };

    if (!paths[key]) return;

    if (isRootPage()) link.href = paths[key].root;
    else if (isUserPage()) link.href = paths[key].user;
    else if (isAuthPage()) link.href = paths[key].auth;
  });

  root.querySelectorAll("[data-img='logo']").forEach((img) => {
    if (isRootPage()) img.src = "assets/images/logo/logo.png";
    else img.src = "../../assets/images/logo/logo.png";
  });
}

function initHeaderAuth() {
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

    if (navUsername) {
      navUsername.textContent = savedUser;
    }
  } else {
    guestActions?.classList.remove("hidden");

    userActions?.classList.add("hidden");
    userActions?.classList.remove("flex");
  }

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    if (isRootPage()) {
      window.location.href = "index.html";
    } else {
      window.location.href = "../../index.html";
    }
  });
}

function initSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;

    const keyword = searchInput.value.trim();

    let target = "";

    if (isRootPage()) {
      target = "pages/user/novels.html";
    } else if (isUserPage()) {
      target = "novels.html";
    } else if (isAuthPage()) {
      target = "../user/novels.html";
    } else {
      target = "pages/user/novels.html";
    }

    if (keyword) {
      window.location.href = `${target}?search=${encodeURIComponent(keyword)}`;
    } else {
      window.location.href = target;
    }
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", loadMaster);