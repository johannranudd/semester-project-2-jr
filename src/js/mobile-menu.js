const sidebar = document.querySelector("#sidebar");
const menuBtn = document.querySelector("#menu-btn");
const menuBackdrop = document.querySelector("#backdrop");

function showMenu() {
  sidebar.classList.remove("-translate-x-[200%]");
  menuBackdrop.classList.remove("hidden");
  menuBackdrop.classList.add("fixed");
}
function hideMenu() {
  sidebar.classList.add("-translate-x-[200%]");
  menuBackdrop.classList.remove("fixed");
  menuBackdrop.classList.add("hidden");
}

function toggleMenu() {
  if (sidebar.className.includes("-translate-x-[200%]")) {
    showMenu();
  } else {
    hideMenu();
  }
}

menuBtn.addEventListener("click", () => {
  toggleMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    hideMenu();
  }
});
