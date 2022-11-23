const sidebar = document.querySelector("#sidebar");
const menuBtn = document.querySelector("#menu-btn");
const menuBackdrop = document.querySelector("#backdrop");
// const mainContainer = document.querySelector("#main-container");

function showMenu() {
  sidebar.classList.remove("-translate-x-[200%]");
  menuBackdrop.classList.remove("hidden");
  menuBackdrop.classList.add("fixed");
  //   placeSidebarLeft();
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
  //   placeSidebarLeft();
  if (window.innerWidth >= 768) {
    hideMenu();
  }
});
// window.addEventListener("DOMContentLoaded", () => {
//   placeSidebarLeft();
// });

// function placeSidebarLeft() {
//   const mainContainerRect = mainContainer.getBoundingClientRect().width;
//   const whitespace = window.innerWidth - mainContainerRect;
//   if (
//     window.innerWidth > 420 &&
//     !sidebar.className.includes("-translate-x-[200%]")
//   ) {
//     sidebar.style.transform = `translateX(-${whitespace / 2 - 8}px)`;
//   } else {
//     hideMenu();
//   }
// }
