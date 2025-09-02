// Handle login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        window.location.href = "dashboard.html";
      } else {
        alert("Login failed. Try again.");
      }
    });
  }

  // Handle register
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("regUsername").value;
      const password = document.getElementById("regPassword").value;

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        alert("Registered successfully. Please log in.");
        window.location.href = "login.html";
      } else {
        alert("Registration failed.");
      }
    });
  }

  // Handle journal submission
  const journalForm = document.getElementById("journalForm");
  if (journalForm) {
    journalForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const entry = document.getElementById("entry").value;

      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry })
      });

      if (res.ok) {
        alert("Entry saved and analyzed!");
        document.getElementById("entry").value = "";
        loadChart(); // refresh chart
      } else {
        alert("Error saving entry.");
      }
    });
  }
});
