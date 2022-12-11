import { clearLocalStorage, getLocalStorage } from "../utils/storage.mjs";
import { getListings, getSingleProfile } from "../utils/gets.mjs";
import { getListingsStillForSale } from "../utils/various.mjs";
import { displayListings } from "../utils/display.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
import { displayBasedOnSort } from "../listings/index.mjs";

const sidebar = document.querySelector("#sidebar");
const menuBtn = document.querySelector("#menu-btn");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");
const menuBackdrop = document.querySelector("#backdrop");
const LogoutBtn = document.querySelector("#logout-btn");
const backdrop = document.querySelector("#backdrop");
const listingsULElement = document.querySelector("#listing");

async function showMenu() {
  sidebar.classList.remove("-translate-x-[200%]");
  menuBackdrop.classList.remove("hidden");
  menuBackdrop.classList.add("fixed");
  line2.style.visibility = "hidden";
  line1.style.transform = "rotate(-45deg) translate(0px,11px)";
  line3.style.transform = "rotate(45deg) translate(0px,-11px)";
}
function hideMenu() {
  sidebar.classList.add("-translate-x-[200%]");
  menuBackdrop.classList.remove("fixed");
  menuBackdrop.classList.add("hidden");
  line1.style.transform = "rotate(0deg) translate(0,0)";
  line3.style.transform = "rotate(0deg) translate(0,0)";
  line2.style.visibility = "visible";
}

function toggleMenu() {
  if (sidebar.className.includes("-translate-x-[200%]")) {
    showMenu();
  } else {
    hideMenu();
  }
}

menuBtn.addEventListener("click", toggleMenu);
backdrop.addEventListener("click", toggleMenu);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    hideMenu();
  }
});

LogoutBtn.addEventListener("click", clearLocalStorage);

window.addEventListener("DOMContentLoaded", async () => {
  // TODO: get active bids and your listings
  const allLinksInSidebar = sidebar.querySelectorAll(".nav-link");
  allLinksInSidebar.forEach((link) => {
    if (window.location.pathname === `/${link.name}`) {
      link.style.color = "#096076";
    }
  });
  // console.log(window.location.pathname);

  const profileCard = document.querySelector(".profile-card");
  const locStor = getLocalStorage();
  if (
    !locStor ||
    !locStor.isLoggedIn ||
    window.location.href.includes("profile.html")
  ) {
    profileCard.style.display = "none";
    LogoutBtn.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket w-10"></i>Logout`;
  } else if (locStor) {
    const usernameProfileCard = profileCard.querySelector(
      "#username-profile-card"
    );
    const profileImage = profileCard.querySelector("img");

    const creditProfileCard = profileCard.querySelector(
      "#credit-profile-card span"
    );

    const listingsProfileCard = profileCard.querySelector(
      "#listings-profile-card span"
    );

    // const profile = await getSingleProfile(locStor.name);
    // const { listings } = profile._count;
    // listingsProfileCard.textContent = listings;
    profileImage.src = locStor.avatar
      ? locStor.avatar
      : "../../../assets/images/profile-img.png";
    usernameProfileCard.textContent = locStor.name;
    creditProfileCard.textContent = locStor.credits;
  }
});

// todo: searchform

const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = searchForm.querySelector("input[type='search']");
  if (input.value) {
    if (!window.location.href.includes("listings.html")) {
      window.location.href = `../../../listings.html?id=${input.value.toLowerCase()}`;
    } else if (window.location.href.includes("listings.html")) {
      const stateObj = {};
      history.pushState(
        stateObj,
        "",
        `listings.html?id=${input.value.toLowerCase()}`
      );
      displayBasedOnSort(false);
    }
    hideMenu();
    input.value = "";
  }
});
