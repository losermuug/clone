// =========================================
// SPA Router - Master Page Pattern
// Header, Footer нэг л удаа ачаалагдана.
// Зөвхөн #app дотор content солигдоно.
// =========================================

(function () {
  "use strict";

  // ========== Route Definitions ==========
  const routes = {
    home: {
      page: "./pages/user/home.html",
      title: "Zohiol Web - Монгол Веб Зохиол",
      scripts: []
    },
    novels: {
      page: "./pages/user/novels.html",
      title: "Зохиолууд - Zohiol Web",
      scripts: []
    },
    "new-novels": {
      page: "./pages/user/new-novels.html",
      title: "Шинэ зохиол - Zohiol Web",
      scripts: []
    },
    popular: {
      page: "./pages/user/popular.html",
      title: "Алдартай - Zohiol Web",
      scripts: []
    },
    "new-chapters": {
      page: "./pages/user/new-chapters.html",
      title: "Шинэ ангиуд - Zohiol Web",
      scripts: []
    },
    detail: {
      page: "./pages/user/detail.html",
      title: "Зохиолын дэлгэрэнгүй - Zohiol Web",
      scripts: []
    },
    read: {
      page: "./pages/user/read.html",
      title: "Анги унших - Zohiol Web",
      scripts: []
    },
    profile: {
      page: "./pages/user/profile.html",
      title: "Миний булан - Zohiol Web",
      scripts: []
    },
    favorites: {
      page: "./pages/user/favorites.html",
      title: "Дуртай зохиол - Zohiol Web",
      scripts: []
    },
    "my-reading": {
      page: "./pages/user/my-reading.html",
      title: "Сүүлд уншсан - Zohiol Web",
      scripts: []
    },
    payment: {
      page: "./pages/user/payment.html",
      title: "Эрх сунгах - Zohiol Web",
      scripts: []
    },
    transactions: {
      page: "./pages/user/transactions.html",
      title: "Гүйлгээний түүх - Zohiol Web",
      scripts: []
    }
  };

  let currentRoute = null;

  // ========== Progress Bar ==========
  const progress = document.getElementById("spa-progress");

  function showProgress() {
    if (!progress) return;
    progress.style.width = "0%";
    progress.classList.add("active");
    setTimeout(() => { progress.style.width = "40%"; }, 10);
    setTimeout(() => { progress.style.width = "70%"; }, 100);
  }

  function hideProgress() {
    if (!progress) return;
    progress.style.width = "100%";
    setTimeout(() => {
      progress.classList.remove("active");
      progress.style.width = "0%";
    }, 300);
  }

  // ========== Active Nav Highlight ==========
  function updateActiveNav(routeKey) {
    document.querySelectorAll("[data-spa-link]").forEach(link => {
      link.classList.remove("text-red-600", "font-semibold");
    });

    document.querySelectorAll(`[data-spa-link="${routeKey}"]`).forEach(link => {
      link.classList.add("text-red-600", "font-semibold");
    });
  }

  // ========== Script Loading ==========
  function removeOldSpaScripts() {
    document.querySelectorAll("script[data-spa-script]").forEach(s => s.remove());
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src + "?v=" + Date.now();
      script.dataset.spaScript = "true";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // ========== Core Navigation ==========
  async function navigateTo(routeKey, params = {}, pushState = true) {
    const route = routes[routeKey];
    if (!route) {
      console.warn("Unknown route:", routeKey);
      return;
    }

    // Don't reload if same route (except detail/read which have params)
    if (currentRoute === routeKey && routeKey !== "detail" && routeKey !== "read") {
      return;
    }

    const app = document.getElementById("app");
    if (!app) return;

    showProgress();

    // Fade out
    app.classList.add("spa-loading");

    try {
      const response = await fetch(route.page + "?v=" + Date.now());
      if (!response.ok) throw new Error("Page not found: " + route.page);

      let html = await response.text();

      // Wait for fade out
      await new Promise(r => setTimeout(r, 120));

      // Insert HTML
      app.innerHTML = html;

      // Update title
      document.title = route.title;

      // Remove old scripts, load new ones
      removeOldSpaScripts();
      for (const src of route.scripts) {
        await loadScript(src);
      }

      // Run inline scripts inside the loaded HTML
      runInlineScripts(app);

      // Update nav highlight
      updateActiveNav(routeKey);
      currentRoute = routeKey;

      // Update URL
      if (pushState) {
        const url = buildUrl(routeKey, params);
        history.pushState({ route: routeKey, params }, "", url);
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "instant" });

      // Fade in
      app.classList.remove("spa-loading");
    } catch (err) {
      console.error("SPA navigation error:", err);
      app.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Хуудас олдсонгүй</h2>
          <p class="text-gray-500 mb-8">Уучлаарай, хуудас ачааллахад алдаа гарлаа.</p>
          <a href="#" data-spa-link="home" class="bg-red-700 text-white px-6 py-3 rounded-2xl">Нүүр хуудас</a>
        </div>
      `;
      app.classList.remove("spa-loading");
    }

    hideProgress();
  }

  // ========== Inline Script Execution ==========
  function runInlineScripts(container) {
    const scripts = container.querySelectorAll("script");
    scripts.forEach(oldScript => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      newScript.dataset.spaScript = "true";
      oldScript.replaceWith(newScript);
    });
  }

  // ========== URL Builder ==========
  function buildUrl(routeKey, params = {}) {
    let url = "";
    switch (routeKey) {
      case "home":
        url = "./index.html";
        break;
      case "novels":
        url = "./index.html?page=novels";
        break;
      case "new-novels":
        url = "./index.html?page=new-novels";
        break;
      case "popular":
        url = "./index.html?page=popular";
        break;
      case "new-chapters":
        url = "./index.html?page=new-chapters";
        break;
      case "detail":
        url = `./index.html?page=detail&id=${params.id || 1}`;
        break;
      case "read":
        url = `./index.html?page=read&id=${params.id || 1}&chapter=${params.chapter || 1}`;
        break;
      case "profile":
        url = "./index.html?page=profile";
        break;
      case "favorites":
        url = "./index.html?page=favorites";
        break;
      case "my-reading":
        url = "./index.html?page=my-reading";
        break;
      case "payment":
        url = "./index.html?page=payment";
        break;
      case "transactions":
        url = "./index.html?page=transactions";
        break;
      default:
        url = "./index.html";
    }
    return url;
  }

  // ========== Parse URL to Route ==========
  function parseUrlToRoute() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    const params = {};

    if (urlParams.has("id")) params.id = urlParams.get("id");
    if (urlParams.has("chapter")) params.chapter = urlParams.get("chapter");
    if (urlParams.has("search")) params.search = urlParams.get("search");

    return {
      routeKey: page && routes[page] ? page : "home",
      params
    };
  }

  // ========== Event Handlers ==========

  // Click handler for [data-spa-link] elements
  document.addEventListener("click", function (e) {
    const link = e.target.closest("[data-spa-link]");
    if (!link) return;

    e.preventDefault();

    const routeKey = link.dataset.spaLink;
    const params = {};

    // Extract params from data attributes
    if (link.dataset.id) params.id = link.dataset.id;
    if (link.dataset.chapter) params.chapter = link.dataset.chapter;

    navigateTo(routeKey, params);

    // Close mobile menu if open
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) mobileMenu.classList.add("hidden");
  });

  // Browser back/forward
  window.addEventListener("popstate", function (e) {
    if (e.state && e.state.route) {
      navigateTo(e.state.route, e.state.params || {}, false);
    } else {
      const { routeKey, params } = parseUrlToRoute();
      navigateTo(routeKey, params, false);
    }
  });

  // ========== Auth State ==========
  function initAuth() {
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
      localStorage.removeItem("email");
      window.location.href = "./pages/auth/login.html";
    });
  }

  // ========== Search ==========
  function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;

      const keyword = searchInput.value.trim();
      if (keyword) {
        navigateTo("novels", { search: keyword });
      } else {
        navigateTo("novels");
      }
    });
  }

  // ========== Mobile Menu ==========
  function initMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn?.addEventListener("click", () => {
      mobileMenu?.classList.toggle("hidden");
    });
  }

  // ========== Global Functions (for onclick handlers in content) ==========
  window.spaNavigate = navigateTo;

  window.goDetail = function (id) {
    navigateTo("detail", { id });
  };

  window.goRead = function (id, chapter) {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!user || role !== "user") {
      window.location.href = "./pages/auth/login.html";
      return;
    }

    navigateTo("read", { id, chapter: chapter || 1 });
  };

  window.goNovels = function () {
    navigateTo("novels");
  };

  window.goUserProfile = function () {
    navigateTo("profile");
  };

  window.goProfile = function () {
    navigateTo("profile");
  };

  window.goFavorites = function () {
    navigateTo("favorites");
  };

  window.goMyReading = function () {
    navigateTo("my-reading");
  };

  window.goPayment = function () {
    navigateTo("payment");
  };

  window.goTransactions = function () {
    navigateTo("transactions");
  };

  window.goUserNovels = function () {
    navigateTo("novels");
  };

  // ========== Init ==========
  // Wait for user-master.html to be loaded, then init
  function bootRouter() {
    initAuth();
    initSearch();
    initMobileMenu();

    // Load initial page based on URL
    const { routeKey, params } = parseUrlToRoute();
    navigateTo(routeKey, params, false);

    // Replace current state
    history.replaceState(
      { route: routeKey, params },
      "",
      window.location.href
    );
  }

  // If header already loaded (custom event from index.html)
  document.addEventListener("masterLoaded", bootRouter);

  // Fallback: if masterLoaded already fired before this script loaded
  if (document.getElementById("masterHeader")) {
    bootRouter();
  }
})();