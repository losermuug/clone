document.addEventListener("DOMContentLoaded", function () {

  // ===== LOGIN =====
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Имэйл болон нууц үгээ оруул!");
        return;
      }

      if (username === "admin" && password === "1234") {
        localStorage.setItem("role", "admin");
        window.location.href = "../admin/dashboard.html";
        return;
      }

      localStorage.setItem("user", username);
      localStorage.setItem("role", "user");

      window.location.href = "../user/novels.html";
    });
  }

  // ===== REGISTER =====
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("regUsername").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();
      const confirm = document.getElementById("regConfirmPassword").value.trim();

      if (!username || !email || !password || !confirm) {
        alert("Бүх талбарыг бөглөнө үү!");
        return;
      }

      if (password !== confirm) {
        alert("Нууц үг таарахгүй байна!");
        return;
      }

      // хадгална
      localStorage.setItem("user", username);

      alert("Амжилттай бүртгэгдлээ!");

      window.location.href = "login.html";
    });
  }

});