import { getSingleProfile } from "../utils/gets.mjs";
import { getLocalStorage, setLocalStorage } from "../utils/storage.mjs";
import { updateProfileAvatar } from "../utils/puts.mjs";
const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

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

  const formEditUser = document.querySelector("#edit-user-info-form");
  const label = formEditUser.querySelector("label");
  const newAvatarUrlInput = document.querySelector("#newAvatarUrl");
  newAvatarUrlInput.placeholder = "https://images.example.com/photo";
  // submit

  formEditUser.addEventListener("submit", async (e) => {
    e.preventDefault();

    // *commented out to allow user to remove their avatar
    // if (newAvatarUrlInput.value) {
    let submitObject = { avatar: newAvatarUrlInput.value };
    const locStor = getLocalStorage();
    const res = await updateProfileAvatar(locStor.name, submitObject);
    if (res.errors) {
      changeAvatarWarning(label, res.errors[0].message);
    } else {
      closeModal();
      getProfileCardInfo();
    }
    // } else {
    //   changeAvatarWarning(label, "Please input a valid image URL");
    // }
  });
});

function changeAvatarWarning(elem, message) {
  elem.style.color = "#F16A6A";
  elem.textContent = message;
}

modalBackDrop.addEventListener("click", closeModal);
function openModal() {
  // create
  document.body.appendChild(modalBackDrop);
  modal.innerHTML = `<form id="edit-user-info-form" class="space-y-2">
    <label for="newAvatarUrl">Change Avatar</label>
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

  const locStorInitial = getLocalStorage();
  if (!urlID || urlID === locStorInitial.name) {
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
    const profile = await getSingleProfile(urlID);
    profileImageMainCard.src = profile.avatar
      ? profile.avatar
      : "../../../assets/images/profile-img.png";
    usernameMainProfileCard.textContent = profile.name;
    userEmail.textContent = profile.email;
    listingsMainProfileCard.textContent = profile._count.listings;
    creditsMainProfileCard.textContent = profile.credits;
    winsMainProfileCard.textContent = profile.wins.length;

    editProfileBtn.style.display = "none";
  }
}
