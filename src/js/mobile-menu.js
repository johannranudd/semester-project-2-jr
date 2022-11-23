const sidebar = document.querySelector("#sidebar");
const menuBtn = document.querySelector("#menu-btn");
const menuBackdrop = document.querySelector("#backdrop");

// const { screen } = require("../../tailwind.config.js");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show-sidebar");
  if (sidebar.className.includes("-translate-x-[200%]")) {
    sidebar.classList.remove("-translate-x-[200%]");
    menuBackdrop.classList.remove("hidden");
    menuBackdrop.classList.add("fixed");
    console.log("show");
  } else {
    sidebar.classList.add("-translate-x-[200%]");
    menuBackdrop.classList.remove("fixed");
    menuBackdrop.classList.add("hidden");
    console.log("hidden");
  }
});

window.addEventListener("resize", () => {
  //   console.log(window.innerWidth);
  //   console.log(screen);
});
