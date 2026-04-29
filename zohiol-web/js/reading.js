document.addEventListener("DOMContentLoaded", () => {
  initReadingPage();
});

const readingList = [
  {id:1, title:"Тулааны Бурхан Асура", author:"Б. Эрдэнэбат", chapter:58, progress:85, img:"../../assets/images/covers/1.png"},
  {id:2, title:"Харанхуйн Хаан", author:"С. Болормаа", chapter:31, progress:45, img:"../../assets/images/covers/2.png"},
  {id:3, title:"Сүнсний Зам", author:"Д. Наранбаатар", chapter:62, progress:100, img:"../../assets/images/covers/3.png"},
  {id:4, title:"Зүрхний Дуу", author:"О. Сувд", chapter:19, progress:20, img:"../../assets/images/covers/D.png"}
];

let filtered = [...readingList];

function initReadingPage() {
  const user = localStorage.getItem("user");
  const nameEl = document.getElementById("readingHeroName");

  if (user && nameEl) {
    nameEl.textContent = user;
  }

  renderReading(filtered);

  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("sortSelect").addEventListener("change", applyFilters);
}

function renderReading(data) {
  const grid = document.getElementById("readingGrid");
  grid.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <img src="${item.img}" class="w-full h-56 object-cover rounded-xl">

      <div class="p-4">
        <h3 class="font-bold text-xl">${item.title}</h3>
        <p class="text-gray-500">Зохиолч: ${item.author}</p>
        <p class="text-sm mt-1">${item.chapter}-р анги</p>

        <div class="mt-3">
          <div class="h-2 bg-gray-200 rounded-full">
            <div class="h-2 bg-red-600 rounded-full" style="width:${item.progress}%"></div>
          </div>
          <p class="text-sm mt-1 text-red-600">${item.progress}%</p>
        </div>

        <div class="mt-4 flex gap-2">
          <button onclick="continueReading(${item.id},${item.chapter})" class="user-btn-primary">
            Үргэлжлүүлэх
          </button>

          <button onclick="goDetail(${item.id})" class="user-btn-secondary">
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function applyFilters() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const sort = document.getElementById("sortSelect").value;

  filtered = readingList.filter(item =>
    item.title.toLowerCase().includes(keyword)
  );

  if (sort === "high") filtered.sort((a,b)=>b.progress-a.progress);
  if (sort === "low") filtered.sort((a,b)=>a.progress-b.progress);
  if (sort === "name") filtered.sort((a,b)=>a.title.localeCompare(b.title));

  renderReading(filtered);
}

function continueReading(id, chapter){
  window.location.href = `read.html?id=${id}&chapter=${chapter}`;
}