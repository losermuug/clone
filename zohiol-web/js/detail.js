const urlParams = new URLSearchParams(window.location.search);
const novelId = parseInt(urlParams.get("id"), 10) || 1;

const novels = {
  1: {
    title: "Тулааны Бурхан Асура",
    author: "Б. Эрдэнэбат",
    category: "Тулаант",
    image: "../../assets/images/covers/1.png",
    desc: "Эртний бурхдын хүчийг өвлөсөн залуу тулаанчийн домогт түүх. Шинэ анги тогтмол нэмэгддэг.",
    totalChapters: 128,
    latestChapter: 128
  },
  2: {
    title: "Харанхуйн Хаан",
    author: "С. Болормаа",
    category: "Уран зөгнөл",
    image: "../../assets/images/covers/2.png",
    desc: "Харанхуйн ертөнцийг захирах хүчтэй хааны өсөлт, тулаан, нууцуудын тухай.",
    totalChapters: 87,
    latestChapter: 87
  },
  3: {
    title: "Сүнсний Зам",
    author: "Д. Наранбаатар",
    category: "Адал явдал",
    image: "../../assets/images/covers/3.png",
    desc: "Алга болсон сүнсийг эрэн хайх урт аялал, сорилтууд, шинэ ертөнцийн тухай.",
    totalChapters: 62,
    latestChapter: 62
  },
  4: {
    title: "Зүрхний Дуу",
    author: "О. Сувд",
    category: "Романтик",
    image: "../../assets/images/covers/D.png",
    desc: "Хайр дурлал, хагацал, сэтгэлийн гүн мэдрэмжийг өгүүлэх романтик зохиол.",
    totalChapters: 94,
    latestChapter: 94
  }
};

const novel = novels[novelId] || novels[1];

document.getElementById("pageTitle").textContent = `${novel.title} - Zohiol Web`;
document.getElementById("novelImage").src = novel.image;
document.getElementById("novelImage").alt = novel.title;
document.getElementById("novelCategoryBadge").textContent = novel.category;
document.getElementById("novelTitle").textContent = novel.title;
document.getElementById("novelAuthor").textContent = `Зохиолч: ${novel.author}`;
document.getElementById("novelStats").textContent =
  `${novel.totalChapters} анги • Сүүлд нэмэгдсэн: ${novel.latestChapter}-р анги`;
document.getElementById("novelDesc").textContent = novel.desc;

// Эхний ангийг унших
document.getElementById("readFirstBtn").href = `read.html?id=${novelId}&chapter=1`;

const allChapters = Array.from({ length: novel.totalChapters }, (_, index) => {
  const number = index + 1;
  const now = new Date();
  now.setDate(now.getDate() - (novel.totalChapters - number));

  return {
    number,
    title: `${number} – ${getChapterTitle(number)}`,
    dateText: formatDate(now),
    isLatest: number > novel.totalChapters - 10
  };
});

function getChapterTitle(chapterNumber) {
  const titles = [
    "Гадаад танхимийн шавь",
    "Үзэгдэлэнт настан",
    "Шалгалт эхэллээ",
    "Догшин араатнууд",
    "Азурэ Драгон үүсгэн байгуулагч",
    "Арай тэр гэж үү?",
    "Сүнслэг ургамалын эрэлд",
    "Чу Юэтэй санаандгүй таарсан нь",
    "Би гэрчилнэ",
    "Хэлсэн амнаасаа буцав",
    "Хүчний сэргэлт",
    "Шинэ өрсөлдөгч"
  ];

  return titles[(chapterNumber - 1) % titles.length];
}

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function chapterReadUrl(chapterNumber) {
  return `read.html?id=${novelId}&chapter=${chapterNumber}`;
}

const chaptersPerPage = 10;
let currentPage = 1;
let currentMode = "all";
let currentData = [...allChapters];

function renderChapters(data) {
  const grid = document.getElementById("chaptersGrid");
  grid.innerHTML = "";

  const start = (currentPage - 1) * chaptersPerPage;
  const paginated = data.slice(start, start + chaptersPerPage);

  paginated.forEach((chapter) => {
    const item = document.createElement("a");
    item.href = chapterReadUrl(chapter.number);
    item.className = "chapter-item block py-6 px-6 rounded-2xl";
    item.innerHTML = `
      <div class="text-2xl font-medium text-gray-900">${chapter.title}</div>
      <div class="text-gray-400 text-sm mt-2">${chapter.dateText}</div>
    `;
    grid.appendChild(item);
  });

  renderPagination(data.length);
}

function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(totalItems / chaptersPerPage));

  for (let i = 1; i <= totalPages && i <= 5; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `page-btn w-12 h-12 rounded-xl border border-gray-200 font-medium ${
      i === currentPage ? "active" : "bg-white hover:bg-gray-100"
    }`;

    btn.addEventListener("click", () => {
      currentPage = i;
      renderChapters(currentData);
    });

    pagination.appendChild(btn);
  }

  if (totalPages > 5) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">>";
    nextBtn.className =
      "w-14 h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 font-medium";

    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderChapters(currentData);
      }
    });

    pagination.appendChild(nextBtn);
  }
}

function setSection(mode) {
  const title = document.getElementById("chapterSectionTitle");
  const desc = document.getElementById("chapterSectionDesc");

  if (mode === "latest") {
    title.textContent = "Сүүлд нэмэгдсэн ангиуд";
    desc.textContent = "Хамгийн сүүлд нэмэгдсэн 10 ангийг харуулж байна";
  } else if (mode === "search") {
    title.textContent = "Хайлтын үр дүн";
    desc.textContent = "Хайсан ангийг харуулж байна";
  } else {
    title.textContent = "Бүх ангиуд";
    desc.textContent = "Хуудасалж харуулж байна";
  }
}

function showAllChapters() {
  currentMode = "all";
  currentPage = 1;
  currentData = [...allChapters];
  setSection("all");
  renderChapters(currentData);
}

function showLatestChapters() {
  currentMode = "latest";
  currentPage = 1;
  currentData = [...allChapters].slice(-10).reverse();
  setSection("latest");
  renderChapters(currentData);
}

function searchChapter() {
  const value = parseInt(document.getElementById("chapterSearch").value, 10);

  if (!value || value < 1 || value > novel.totalChapters) {
    alert(`1-${novel.totalChapters} хооронд ангийн дугаар оруулна уу.`);
    return;
  }

  currentMode = "search";
  currentPage = 1;
  currentData = allChapters.filter((ch) => ch.number === value);
  setSection("search");
  renderChapters(currentData);
}

document.getElementById("searchBtn").addEventListener("click", searchChapter);

document.getElementById("chapterSearch").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchChapter();
  }
});

document.getElementById("toggleLatestBtn").addEventListener("click", function () {
  if (currentMode === "latest") {
    showAllChapters();
    this.textContent = "Сүүлд нэмэгдсэн";
  } else {
    showLatestChapters();
    this.textContent = "Бүгдийг харах";
  }
});

showAllChapters();