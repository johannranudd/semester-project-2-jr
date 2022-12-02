import { displayListings } from "../utils/display.mjs";
import { getSingleListing } from "../utils/gets.mjs";
import { getLocalStorage } from "../utils/storage.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
import { displayBasedOnSort } from "./index.mjs";
const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

const listingsULElement = document.querySelector("#listing");

window.addEventListener("DOMContentLoaded", () => {
  getSingleProfile();
  displayBasedOnSort();
});

async function getSingleProfile() {
  // * get single profile (yours or others)
  // *display info and listings based on what profile
  if (!urlID) {
    // * no id means you are displayed
    // const locStor = getLocalStorage();
    // const data = await getSingleListing(locStor.name);
    // displayProfileInfo(data)
    // displayProfileListings(data);
  } else {
    // * has id will display other profile and listings
    // display other profiles
    console.log("has id:: ", urlID);
  }
}

// function displayProfileListings() {}
