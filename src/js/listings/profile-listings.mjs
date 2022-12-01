import { displayListings } from "../utils/display.mjs";
import { getSingleListing } from "../utils/gets.mjs";
import { getLocalStorage } from "../utils/storage.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
import { displayBasedOnSort } from "./index.mjs";
const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

const listingsULElement = document.querySelector("#listing");

window.addEventListener("DOMContentLoaded", getSingleProfile);

async function getSingleProfile() {
  if (!urlID) {
    const locStor = getLocalStorage();
    const data = await getSingleListing(locStor.name);
    // displayProfileInfo()
    displayProfileListings(data);
  } else {
    // display other profiles
  }
}

function displayProfileListings() {}
