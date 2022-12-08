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
  const profileCard = document.querySelector(".profile-card");
  const locStor = getLocalStorage();
  if (
    !locStor ||
    !locStor.isLoggedIn ||
    window.location.href.includes("profile.html")
  ) {
    // TODO: get active bids and your listings

    // profileImage.src = "../../../assets/images/profile-img.png";
    // profileCard.innerHTML = `<p class="text-center">Please log in to see profile information</p>`;
    profileCard.style.display = "none";
    LogoutBtn.textContent = "Login";
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

    const profile = await getSingleProfile(locStor.name);
    const { listings } = profile._count;
    listingsProfileCard.textContent = listings;
    profileImage.src = locStor.avatar
      ? locStor.avatar
      : "../../../assets/images/profile-img.png";
    usernameProfileCard.textContent = locStor.name;
    creditProfileCard.textContent = locStor.credits;
  }
});

// todo: searchform

let offset = 0;
let tag = "";
let limit = 100;

const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = searchForm.querySelector("input[type='search']");
  if (!window.location.href.includes("listings.html")) {
    window.location.href = `../../../listings.html?id=${input.value.toLowerCase()}`;
    // console.log(input.value);
    // const urlID = geturlID();
    // console.log(urlID);
    //  grab urlID
    // fetch
    // display
  } else if (window.location.href.includes("listings.html")) {
    // console.log(`you are already on ${window.location.href}`);
    const stateObj = {};
    history.pushState(
      stateObj,
      "",
      `listings.html?id=${input.value.toLowerCase()}`
    );
    displayBasedOnSort(false);
    // console.log(input.value);
    //  grab urlID
    // const urlID = geturlID();
    // console.log(urlID);
    // const data = await getListings(limit, offset, "", "", "");
    // console.log(data);
    // fetch
    // const data
    // display
  }
  // displayBasedOnSort(false);
  // if (input.value) {
  //   if (listingsULElement) {
  //     listingsULElement.innerHTML = "";
  //     loadingSpinner(listingsULElement);
  //     const data = await getListings();
  //     console.log(data);
  //     // const filter = data.filter((item) => {
  //     //   console.log(item);
  //     // });
  //     // displayListings(data, listingsULElement);
  //   }
  // }
  input.value = "";
});
