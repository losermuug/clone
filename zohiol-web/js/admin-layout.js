document.addEventListener("DOMContentLoaded", () => {
  initAdminLayout();
});

function initAdminLayout() {
  setActiveAdminPage();
  setAdminPageMeta();
  bindAdminLogout();
}

function setActiveAdminPage() {
  const path = window.location.pathname.toLowerCase();
  let currentPage = "";

  if (path.includes("/dashboard.html")) currentPage = "dashboard";
  else if (path.includes("/novels-list.html")) currentPage = "novels-list";
  else if (path.includes("/add-novel.html")) currentPage = "add-novel";
  else if (path.includes("/add-chapter.html")) currentPage = "add-chapter";
  else if (path.includes("/users.html")) currentPage = "users";

  document.querySelectorAll("[data-admin-page]").forEach((link) => {
    if (link.dataset.adminPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function setAdminPageMeta() {
  const titleEl = document.getElementById("adminPageTitle");
  const descEl = document.getElementById("adminPageDesc");
  if (!titleEl || !descEl) return;

  const path = window.location.pathname.toLowerCase();

  if (path.includes("/dashboard.html")) {
    titleEl.textContent = "Админ удирдлага";
    descEl.textContent = "Системийн ерөнхий хяналт, хурдан удирдлага";
  } else if (path.includes("/novels-list.html")) {
    titleEl.textContent = "Зохиолын жагсаалт";
    descEl.textContent = "Бүх зохиолыг харах, засах, удирдах";
  } else if (path.includes("/add-novel.html")) {
    titleEl.textContent = "Зохиол нэмэх";
    descEl.textContent = "Шинэ зохиолын үндсэн мэдээлэл бүртгэх";
  } else if (path.includes("/add-chapter.html")) {
    titleEl.textContent = "Анги нэмэх";
    descEl.textContent = "Одоо байгаа зохиолд шинэ анги оруулах";
  } else if (path.includes("/users.html")) {
    titleEl.textContent = "Хэрэглэгчид";
    descEl.textContent = "Хэрэглэгчийн бүртгэл, эрх, төлөв удирдах";
  } else if (path.includes("/edit-novel.html")) {
  titleEl.textContent = "Зохиол засах";
  descEl.textContent = "Одоо байгаа зохиолын мэдээллийг шинэчлэх";
}
}

function bindAdminLogout() {
  const logoutBtn = document.getElementById("adminLogoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "../auth/login.html";
  });
}

function goAddNovel() {
  window.location.href = "add-novel.html";
}

function goAddChapter() {
  window.location.href = "add-chapter.html";
}

function goUsers() {
  window.location.href = "users.html";
}