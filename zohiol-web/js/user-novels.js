const novels = [
  {
    id: 1,
    title: "Тулааны Бурхан Асура",
    description: "Эртний хүчийг өвлөсөн залуу тулаанчийн түүх.",
    category: "Тулаант",
    image: "../../assets/images/covers/1.png"
  },
  {
    id: 2,
    title: "Харанхуйн Хаан",
    description: "Харанхуйн ертөнцийг захирах домог.",
    category: "Уран зөгнөл",
    image: "../../assets/images/covers/2.png"
  },
  {
    id: 3,
    title: "Сүнсний Зам",
    description: "Аялал, нууц, сорилтууд.",
    category: "Адал явдал",
    image: "../../assets/images/covers/3.png"
  },
  {
    id: 4,
    title: "Зүрхний Дуу",
    description: "Хайр дурлалын уянгалаг түүх.",
    category: "Романтик",
    image: "../../assets/images/covers/D.png"
  }
];

function getSearchKeyword() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("search") || "").trim().toLowerCase();
}

function getDetailUrl(id) {
  return `detail.html?id=${id}`;
}

function renderNovels(list) {
  const grid = document.getElementById("novelsGrid");
  const emptyState = document.getElementById("emptyState");

  if (!grid) return;

  grid.innerHTML = "";

  if (!list.length) {
    grid.classList.add("hidden");
    emptyState?.classList.remove("hidden");
    return;
  }

  grid.classList.remove("hidden");
  emptyState?.classList.add("hidden");

  list.forEach((novel) => {
    const card = document.createElement("a");
    card.href = getDetailUrl(novel.id);
    card.className =
      "group bg-white rounded-3xl overflow-hidden cursor-pointer card-hover shadow-sm block";

    card.innerHTML = `
      <img src="${novel.image}" alt="${novel.title}" class="w-full h-72 object-cover">
      <div class="p-6">
        <span class="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full mb-3">
          ${novel.category}
        </span>

        <h3 class="text-xl font-semibold">${novel.title}</h3>
        <p class="text-gray-600 text-sm mt-2">${novel.description}</p>

        <span
          class="mt-5 w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-2xl inline-flex justify-center"
        >
          Унших
        </span>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterNovels() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter ? categoryFilter.value : "";
  const keyword = getSearchKeyword();

  let filtered = [...novels];

  if (selectedCategory) {
    filtered = filtered.filter((novel) => novel.category === selectedCategory);
  }

  if (keyword) {
    filtered = filtered.filter((novel) => {
      return (
        novel.title.toLowerCase().includes(keyword) ||
        novel.description.toLowerCase().includes(keyword) ||
        novel.category.toLowerCase().includes(keyword)
      );
    });
  }

  renderNovels(filtered);
}

document.addEventListener("DOMContentLoaded", function () {
  const categoryFilter = document.getElementById("categoryFilter");

  renderNovels(novels);

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterNovels);
  }

  if (getSearchKeyword()) {
    filterNovels();
  }
});