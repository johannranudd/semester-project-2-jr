const sidebar = document.querySelector("#sidebar");
const menuBtn = document.querySelector("#menu-btn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show-sidebar");
  if (sidebar.className.includes("-translate-x-[200%]")) {
    sidebar.classList.remove("-translate-x-[200%]");
  } else {
    sidebar.classList.add("-translate-x-[200%]");
    console.log("no");
  }
});
