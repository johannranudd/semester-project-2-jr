import { displayListings } from "../utils/display.mjs";
import {
  getListings,
  getSingleListing,
  getSingleProfile,
} from "../utils/gets.mjs";
import { getLocalStorage, setLocalStorage } from "../utils/storage.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
import { displayBasedOnSort, limit, offset } from "./index.mjs";
import { getListingsStillForSale } from "../utils/various.mjs";
import { updateProfileAvatar } from "../utils/puts.mjs";
const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

// const mainProfileCard = document.querySelector(".main-profile-card");

window.addEventListener("DOMContentLoaded", () => {
  getProfileCardInfo();
});

const editProfileBtn = document.querySelector("#edit-profile-btn");
const modalBackDrop = document.createElement("div");
const modal = document.createElement("div");
modalBackDrop.classList.add("backdrop");
modal.classList.add("modal");
editProfileBtn.addEventListener("click", () => {
  openModal();
  // submit
  const formEditUser = document.querySelector("#edit-user-info-form");
  formEditUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newAvatarUrlInput = document.querySelector("#newAvatarUrl");
    let submitObject = { avatar: newAvatarUrlInput.value };
    const locStor = getLocalStorage();
    const res = await updateProfileAvatar(locStor.name, submitObject);
    if (res) {
      closeModal();
      getProfileCardInfo();
    }
  });
});

modalBackDrop.addEventListener("click", closeModal);
function openModal() {
  // create
  document.body.appendChild(modalBackDrop);
  modal.innerHTML = `<form id="edit-user-info-form" class="space-y-2">
    <label for="newAvatarUrl">Change Profile</label>
    <input type="text" id="newAvatarUrl" class="custom-input w-full" name="newAvatarUrl"/>
    <button type="submit" class="btn-primary w-full">Submit</button>
  </form>`;
  document.body.appendChild(modal);
}
function closeModal() {
  document.body.removeChild(modalBackDrop);
  document.body.removeChild(modal);
}
async function getProfileCardInfo() {
  const profileImageMainCard = document.querySelector(
    "#profile-image-main-card"
  );
  const listingsMainProfileCard = document.querySelector(
    "#listings-main-profile-card span"
  );
  const creditsMainProfileCard = document.querySelector(
    "#credits-main-profile-card span"
  );
  const winsMainProfileCard = document.querySelector(
    "#wins-main-profile-card span"
  );
  const usernameMainProfileCard = document.querySelector(
    "#username-main-profil-card"
  );
  const userEmail = document.querySelector("#user-email");

  if (!urlID) {
    const locStorInitial = getLocalStorage();
    const profile = await getSingleProfile(locStorInitial.name);
    const { listings } = profile._count;
    const { token, name, email } = locStorInitial;
    setLocalStorage(true, token, name, email, profile.avatar, profile.credits);
    const locStor = getLocalStorage();

    // new
    profileImageMainCard.src = locStor.avatar
      ? locStor.avatar
      : "../../../assets/images/profile-img.png";
    usernameMainProfileCard.textContent = locStor.name;
    userEmail.textContent = locStor.email;
    listingsMainProfileCard.textContent = listings;
    creditsMainProfileCard.textContent = profile.credits;
    winsMainProfileCard.textContent = profile.wins.length;
  } else {
    // * has id will display other profile and listings
    // display other profiles
    console.log("has id:: ", urlID);
  }
}

// function displayProfileListings() {}
