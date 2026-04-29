document.addEventListener("DOMContentLoaded", () => {
  initPaymentPage();
});

function initPaymentPage() {
  const savedUser = localStorage.getItem("user");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const heroName = document.getElementById("paymentHeroName");
  const heroEmail = document.getElementById("paymentHeroEmail");

  if (savedUser) {
    if (nameInput && !nameInput.value.trim()) {
      nameInput.value = savedUser;
    }
    if (heroName) {
      heroName.textContent = savedUser;
    }
  }

  if (emailInput && heroEmail) {
    heroEmail.textContent = emailInput.value.trim() || "user@email.com";
    emailInput.addEventListener("input", () => {
      heroEmail.textContent = emailInput.value.trim() || "user@email.com";
    });
  }

  if (nameInput && heroName) {
    nameInput.addEventListener("input", () => {
      heroName.textContent = nameInput.value.trim() || "Хэрэглэгч";
    });
  }

  setupPlanSelection();
  setupPaymentButton();
}

function setupPlanSelection() {
  const planButtons = document.querySelectorAll(".payment-plan-card");
  const selectedPlan = document.getElementById("selectedPlan");
  const selectedPrice = document.getElementById("selectedPrice");

  if (!planButtons.length || !selectedPlan || !selectedPrice) return;

  planButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      planButtons.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");

      const name = btn.dataset.name || "";
      const price = btn.dataset.price || "0";

      selectedPlan.textContent = name;
      selectedPrice.textContent = `${Number(price).toLocaleString()}₮`;
    });
  });
}

function setupPaymentButton() {
  const payBtn = document.getElementById("payBtn");
  if (!payBtn) return;

  payBtn.addEventListener("click", () => {
    const name = document.getElementById("nameInput")?.value.trim() || "";
    const email = document.getElementById("emailInput")?.value.trim() || "";
    const selectedPlan = document.getElementById("selectedPlan")?.textContent.trim() || "";
    const selectedPrice = document.getElementById("selectedPrice")?.textContent.trim() || "";

    if (!name || !email) {
      alert("Нэр болон и-мэйлээ бөглөнө үү.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("И-мэйл хаяг буруу байна.");
      return;
    }

    alert(
      `✅ Төлбөрийн хүсэлт үүслээ\n\n` +
      `Нэр: ${name}\n` +
      `И-мэйл: ${email}\n` +
      `Багц: ${selectedPlan}\n` +
      `Дүн: ${selectedPrice}`
    );
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}