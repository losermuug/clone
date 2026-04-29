const currentUser = localStorage.getItem("user");
const currentRole = localStorage.getItem("role");

if (!currentUser || currentRole !== "user") {
  window.location.href = "../auth/login.html";
}

loadComponent("header", "../../components/header.html");
loadComponent("footer", "../../components/footer.html");

const urlParams = new URLSearchParams(window.location.search);
const novelId = parseInt(urlParams.get("id"), 10) || 1;
const chapterNumber = parseInt(urlParams.get("chapter"), 10) || 1;

const novels = {
  1: {
    title: "Тулааны Бурхан Асура",
    author: "Б. Эрдэнэбат",
    category: "Тулаант",
    totalChapters: 128
  },
  2: {
    title: "Харанхуйн Хаан",
    author: "С. Болормаа",
    category: "Уран зөгнөл",
    totalChapters: 87
  },
  3: {
    title: "Сүнсний Зам",
    author: "Д. Наранбаатар",
    category: "Адал явдал",
    totalChapters: 62
  },
  4: {
    title: "Зүрхний Дуу",
    author: "О. Сувд",
    category: "Романтик",
    totalChapters: 94
  }
};

const chapterTitles = [
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

function getChapterTitle(num) {
  return chapterTitles[(num - 1) % chapterTitles.length];
}

function buildParagraphs(novelTitle, chapterNum) {
  return [
    `${novelTitle}-ын ${chapterNum}-р анги эхэлж байлаа. Өглөөний манан сарниж, алсад уулсын орой улаан туяанд гэрэлтэнэ. Гол дүр өмнөх тулаанаас олж авсан сургамжаа эргэн бодон зогсоно.`,
    `Тэрээр энэ удаагийн алхам бүр нь ирээдүйн хувь тавиланг нь өөрчилж мэдэхийг ойлгож байв. Өмнө нь зүгээр л хүч чадал хүсдэг байсан бол одоо тэр хамгаалах зүйлтэй болсон байлаа.`,
    `Хотын зах руу дөхөх тусам орчин улам ширүүсэж, үл таних хүмүүсийн харц түүн рүү чиглэнэ. Хэн нь холбоотон, хэн нь дайсан болохыг ялгах хэцүү ч дотоод зөн нь түүнийг болгоомжтой байхыг сануулна.`,
    `“Жинхэнэ хүч бол зөвхөн ялалт биш, харин хэзээ, юуг хамгаалахаа мэдэх ухаан юм” гэж тэр өөртөө шивнэн бодов.`,
    `Ингээд энэ ангийн төгсгөлд тэр өмнө нь хэзээ ч таарч байгаагүй шинэ сорилтын босгон дээр ирлээ. Дараагийн ангид түүний сонголт бүхнийг өөрчилж мэдэх юм.`
  ];
}

const novel = novels[novelId] || novels[1];
const safeChapter = Math.min(Math.max(chapterNumber, 1), novel.totalChapters);
const currentTitle = getChapterTitle(safeChapter);
const progressPercent = Math.round((safeChapter / novel.totalChapters) * 100);

document.getElementById("pageTitle").textContent = `${novel.title} - ${safeChapter}-р анги`;
document.getElementById("novelCategory").textContent = novel.category;
document.getElementById("novelTitle").textContent = novel.title;
document.getElementById("chapterTitle").textContent = `${safeChapter} – ${currentTitle}`;
document.getElementById("chapterMeta").textContent = `${novel.author} • Нийт ${novel.totalChapters} анги`;
document.getElementById("progressText").textContent = `${safeChapter}/${novel.totalChapters} • ${progressPercent}%`;
document.getElementById("progressFill").style.width = `${progressPercent}%`;

const detailUrl = `detail.html?id=${novelId}`;
document.getElementById("backToDetail").href = detailUrl;
document.getElementById("allChaptersBtn").href = detailUrl;
document.getElementById("allChaptersBtnTop").href = detailUrl;

const content = document.getElementById("chapterContent");
content.innerHTML = "";

buildParagraphs(novel.title, safeChapter).forEach((text) => {
  const p = document.createElement("p");
  p.textContent = text;
  content.appendChild(p);
});

const prevBtn = document.getElementById("prevChapterBtn");
const nextBtn = document.getElementById("nextChapterBtn");

if (safeChapter > 1) {
  prevBtn.href = `read.html?id=${novelId}&chapter=${safeChapter - 1}`;
  prevBtn.classList.remove("disabled");
} else {
  prevBtn.href = "#";
  prevBtn.classList.add("disabled");
}

if (safeChapter < novel.totalChapters) {
  nextBtn.href = `read.html?id=${novelId}&chapter=${safeChapter + 1}`;
  nextBtn.classList.remove("disabled");
} else {
  nextBtn.href = "#";
  nextBtn.classList.add("disabled");
}