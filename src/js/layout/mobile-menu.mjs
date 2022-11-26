import { clearLocalStorage, getLocalStorage } from "../utils/storage.mjs";
import { getListings } from "../utils/gets.mjs";

const sidebar = document.querySelector("#sidebar");
const menuBtn = document.querySelector("#menu-btn");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");
const menuBackdrop = document.querySelector("#backdrop");
const LogoutBtn = document.querySelector("#logout-btn");

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

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    hideMenu();
  }
});

LogoutBtn.addEventListener("click", clearLocalStorage);

window.addEventListener("DOMContentLoaded", () => {
  const profileCard = document.querySelector(".profile-card");
  const profileImage = profileCard.querySelector("img");
  // TODO: get active bids and your listings
  // const listingsProfileCard = profileCard.querySelector(
  //   "#listings-profile-card"
  // );
  // const bidsProfileCard = profileCard.querySelector("#bids-profile-card");
  const creditProfileCard = profileCard.querySelector(
    "#credit-profile-card span"
  );
  const locStor = getLocalStorage();
  profileImage.src = locStor.avatar;
  creditProfileCard.textContent = locStor.credits;
});

// async function getActiveBids() {
//   const data = await getListings();
//   console.log("HERE::: ", data);
//   const getYourBids = data.filter((listing) => {
//     const bidsOnListing = listing.bids;
//     console.log(bidsOnListing);
//   });
// }
// getActiveBids();
