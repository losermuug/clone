document.addEventListener("DOMContentLoaded", () => {
  initUserHeaderState();
  initProfileData(); // 👈 profile sync
});

// ================= HEADER =================
function initUserHeaderState() {
  const savedUser = localStorage.getItem("user");
  const savedRole = localStorage.getItem("role");

  const userName = document.getElementById("userHeaderName");
  const logoutBtn = document.getElementById("userLogoutBtn");
  const mobileLogoutBtn = document.getElementById("userMobileLogoutBtn");
  const menuBtn = document.getElementById("userMenuBtn");
  const mobileMenu = document.getElementById("userMobileMenu");

  if (!savedUser || savedRole !== "user") {
    window.location.href = "../auth/login.html";
    return;
  }

  if (userName) userName.textContent = savedUser;

  if (logoutBtn) logoutBtn.onclick = logoutUser;
  if (mobileLogoutBtn) mobileLogoutBtn.onclick = logoutUser;

  if (menuBtn && mobileMenu) {
    menuBtn.onclick = () => mobileMenu.classList.toggle("show");
  }

  setActiveUserNav();
}

// ================= PROFILE DATA =================
function initProfileData() {
  const user = localStorage.getItem("user");
  const email = localStorage.getItem("email");

  const nameEls = [
    document.getElementById("profileName"),
    document.getElementById("infoName")
  ];

  const emailEls = [
    document.getElementById("profileEmail"),
    document.getElementById("infoEmail")
  ];

  nameEls.forEach(el => {
    if (el) el.textContent = user || "User";
  });

  emailEls.forEach(el => {
    if (el) el.textContent = email || "example@gmail.com";
  });
}

// ================= LOGOUT =================
function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("email"); // 👈 нэмсэн
  localStorage.removeItem("role");
  window.location.href = "../auth/login.html";
}

// ================= NAV =================
function setActiveUserNav() {
  const path = window.location.pathname.toLowerCase();

  let currentPage = "";

  if (path.includes("/profile.html")) currentPage = "profile";
  else if (path.includes("/favorites.html")) currentPage = "favorites";
  else if (path.includes("/my-reading.html")) currentPage = "my-reading";
  else if (path.includes("/payment.html")) currentPage = "payment";
  else if (path.includes("/transactions.html")) currentPage = "transactions";
  else if (path.includes("/novels.html")) currentPage = "novels";
  else if (path.includes("/popular.html")) currentPage = "popular";
  else if (path.includes("/new-novels.html")) currentPage = "new-novels";
  else if (path.includes("/detail.html")) currentPage = "novels";

  document.querySelectorAll("[data-user-page]").forEach((item) => {
    item.classList.toggle("active", item.dataset.userPage === currentPage);
  });
}

// ================= ROUTES =================
function goUserProfile() { window.location.href = "profile.html"; }
function goFavorites() { window.location.href = "favorites.html"; }
function goMyReading() { window.location.href = "my-reading.html"; }
function goPayment() { window.location.href = "payment.html"; }
function goTransactions() { window.location.href = "transactions.html"; }
function goUserNovels() { window.location.href = "novels.html"; }
function goPopular() { window.location.href = "popular.html"; }
function goNewNovels() { window.location.href = "new-novels.html"; }
function goDetail(id) { window.location.href = `detail.html?id=${id}`; }
function goRead(id, chapter = 1) {
  window.location.href = `read.html?id=${id}&chapter=${chapter}`;
}