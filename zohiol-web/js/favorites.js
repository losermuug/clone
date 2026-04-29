document.addEventListener("DOMContentLoaded", () => {
  initFavoritesPage();
});

const favoriteNovels = [
  {
    id: 1,
    title: "Тулааны Бурхан Асура",
    author: "Б. Эрдэнэбат",
    category: "Тулаант",
    img: "../../assets/images/covers/1.png"
  },
  {
    id: 2,
    title: "Харанхуйн Хаан",
    author: "С. Болормаа",
    category: "Уран зөгнөл",
    img: "../../assets/images/covers/2.png"
  },
  {
    id: 4,
    title: "Зүрхний Дуу",
    author: "О. Сувд",
    category: "Романтик",
    img: "../../assets/images/covers/D.png"
  }
];

let filteredFavorites = [...favoriteNovels];

function initFavoritesPage() {
  const savedUser = localStorage.getItem("user");
  const heroName = document.getElementById("favoritesHeroName");
  const searchInput = document.getElementById("favoritesSearchInput");

  if (savedUser && heroName) {
    heroName.textContent = savedUser;
  }

  renderFavorites(filteredFavorites);

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.trim().toLowerCase();

      filteredFavorites = favoriteNovels.filter((item) => {
        return (
          item.title.toLowerCase().includes(keyword) ||
          item.author.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword)
        );
      });

      renderFavorites(filteredFavorites);
    });
  }
}

function renderFavorites(data) {
  const grid = document.getElementById("favoritesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!data.length) {
    grid.innerHTML = `
      <div class="user-card favorites-empty">
        <h3 class="favorites-empty__title">Илэрц олдсонгүй</h3>
        <p class="favorites-empty__text">Хайлтанд тохирох дуртай зохиол алга.</p>
      </div>
    `;
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "user-card favorites-card";

    card.innerHTML = `
      <div class="favorites-card__layout">
        <div class="favorites-card__image-wrap">
          <img
            src="${item.img}"
            alt="${item.title}"
            class="favorites-card__image"
          />
        </div>

        <div class="favorites-card__body">
          <div class="favorites-card__badge">${item.category}</div>

          <h3 class="favorites-card__title">${item.title}</h3>
          <p class="favorites-card__author">Зохиолч: ${item.author}</p>

          <div class="favorites-card__actions">
            <button type="button" onclick="goDetail(${item.id})" class="user-btn-primary">
              Дэлгэрэнгүй
            </button>

            <button type="button" onclick="removeFavorite(${item.id})" class="user-btn-secondary">
              Хасах
            </button>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function removeFavorite(id) {
  filteredFavorites = filteredFavorites.filter((item) => item.id !== id);
  renderFavorites(filteredFavorites);
}