// ===== SHARED AUTH + NAVBAR LOGIC =====

function updateNavbar() {
  var user = localStorage.getItem("loggedInUser");
  var authButtons = document.getElementById("authButtons");
  var accountButton = document.getElementById("accountButton");
  if (!authButtons || !accountButton) return;
  if (user) {
    authButtons.style.display = "none";
    accountButton.style.display = "inline-flex";
    accountButton.style.alignItems = "center";
    accountButton.style.gap = "6px";
  } else {
    authButtons.style.display = "flex";
    accountButton.style.display = "none";
  }
}

function checkLogin(page) {
  if (localStorage.getItem("loggedInUser")) {
    window.location.href = page;
  } else {
    openModal("login");
  }
}

// ===== MODAL =====
var currentTab = "login";

function openModal(tab) {
  currentTab = tab || "login";
  switchTab(currentTab);
  var modal = document.getElementById("authModal");
  if (modal) modal.classList.add("open");
  var msg = document.getElementById("authMsg");
  if (msg) { msg.className = "modal-msg"; msg.innerText = ""; }
}

function closeModal() {
  var modal = document.getElementById("authModal");
  if (modal) modal.classList.remove("open");
}

// FIX: hide panels by ID, not by class (panels had no class "modal-panel")
function switchTab(tab) {
  currentTab = tab;

  // Remove active from all tabs
  var tabs = document.querySelectorAll(".modal-tab");
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");

  // Hide all panels by their IDs directly
  var panelIds = ["panel-login", "panel-register", "panel-forgot"];
  for (var j = 0; j < panelIds.length; j++) {
    var el = document.getElementById(panelIds[j]);
    if (el) el.style.display = "none";
  }

  // Show the selected tab button and panel
  var activeTab = document.getElementById("tab-" + tab);
  if (activeTab) activeTab.classList.add("active");

  var activePanel = document.getElementById("panel-" + tab);
  if (activePanel) activePanel.style.display = "block";
}

// ===== LOGIN =====
function doLogin() {
  var user = document.getElementById("loginUser").value.trim();
  var pass = document.getElementById("loginPass").value;
  var msg = document.getElementById("authMsg");

  if (!user || !pass) {
    msg.className = "modal-msg error";
    msg.innerText = "Please fill all fields.";
    return;
  }

  var users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[user] && users[user].password === pass) {
    localStorage.setItem("loggedInUser", user);
    localStorage.setItem("currentUser", JSON.stringify({
      full_name: users[user].full_name || user,
      email: users[user].email || "",
      phone: users[user].phone || "Not Added",
      address: users[user].address || "Not Added"
    }));
    msg.className = "modal-msg success";
    msg.innerText = "Login successful! Welcome back 🎉";
    setTimeout(function() {
      closeModal();
      updateNavbar();
    }, 900);
  } else {
    msg.className = "modal-msg error";
    msg.innerText = "Invalid username or password.";
  }
}

// ===== REGISTER (in modal) =====
function doRegister() {
  var name = document.getElementById("regName").value.trim();
  var email = document.getElementById("regEmail").value.trim();
  var phone = document.getElementById("regPhone").value.trim();
  var pass = document.getElementById("regPass").value;
  var msg = document.getElementById("authMsg");

  if (!name || !email || !phone || !pass) {
    msg.className = "modal-msg error";
    msg.innerText = "Please fill all fields.";
    return;
  }

  var users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[name]) {
    msg.className = "modal-msg error";
    msg.innerText = "Username already exists. Try another.";
    return;
  }

  users[name] = { password: pass, full_name: name, email: email, phone: phone, address: "" };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", name);
  localStorage.setItem("currentUser", JSON.stringify({
    full_name: name, email: email, phone: phone, address: ""
  }));
  msg.className = "modal-msg success";
  msg.innerText = "Account created! Welcome 🌱";
  setTimeout(function() {
    closeModal();
    updateNavbar();
  }, 900);
}

// ===== FORGOT PASSWORD =====
function doForgotPw() {
  var user = document.getElementById("fpUser").value.trim();
  var newPw = document.getElementById("fpNewPass").value;
  var newPw2 = document.getElementById("fpNewPass2").value;
  var msg = document.getElementById("authMsg");

  if (!user || !newPw || !newPw2) {
    msg.className = "modal-msg error";
    msg.innerText = "Please fill all fields.";
    return;
  }
  if (newPw !== newPw2) {
    msg.className = "modal-msg error";
    msg.innerText = "Passwords do not match.";
    return;
  }

  var users = JSON.parse(localStorage.getItem("users") || "{}");
  if (!users[user]) {
    msg.className = "modal-msg error";
    msg.innerText = "Username not found. Please register first.";
    return;
  }

  users[user].password = newPw;
  localStorage.setItem("users", JSON.stringify(users));
  msg.className = "modal-msg success";
  msg.innerText = "Password reset successfully! Please login.";
  setTimeout(function() { switchTab("login"); }, 1500);
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("currentUser");
  if (window.location.href.indexOf("profile.html") !== -1) {
    window.location.href = "fertilizer.html";
  } else {
    updateNavbar();
    alert("Logged out successfully.");
  }
}

// ===== CART COUNT =====
function updateCartCount() {
  var el = document.getElementById("cartCount");
  if (!el) return;
  var cart = JSON.parse(localStorage.getItem("cart") || "[]");
  el.innerText = cart.length > 0 ? cart.length : "";
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
  updateNavbar();
  updateCartCount();

  // Hamburger
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function() {
      navLinks.classList.toggle("open");
    });
  }

  // Close modal on backdrop click
  var modal = document.getElementById("authModal");
  if (modal) {
    modal.addEventListener("click", function(e) {
      if (e.target === modal) closeModal();
    });
  }
});
