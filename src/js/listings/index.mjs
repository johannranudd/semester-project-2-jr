import { getListings } from "../utils/gets.mjs";
import { displayListings } from "../utils/display.mjs";
import {
  getListingsStillForSale,
  filterHighestBid,
  sortByHighestInteger,
  sortByLowestInteger,
} from "../utils/various.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
const listingsULElement = document.querySelector("#listing");
const sortListingsForm = document.querySelector("#sort-listings-form");
const categories = document.querySelector("#categories");

let offset = 0;

window.addEventListener("DOMContentLoaded", displayBasedOnSort, getTags());

categories.addEventListener("change", displayBasedOnSort);

async function getTags() {
  // TODO: come back here to filter after creating posts with apropriate tags
  const data = await getListings("", offset, "", "", "");
  data.map((listing) => {
    console.log(listing.tags);
  });
  // GET /api/v1/auction/listings?_tag=my_tag
}

async function displayBasedOnSort(e, isAddingToPrevList = false) {
  if (!isAddingToPrevList) {
    if (listingsULElement) {
      listingsULElement.innerHTML = "";
      loadingSpinner(listingsULElement);
    }
  } else {
    loadingSpinner(listingsULElement);
  }
  if (e.target.value === undefined) {
    const data = await getListings("", offset, "created", "desc");
    displayListings(data, listingsULElement, false);
  } else if (e.target.value === "newest") {
    const data = await getListings("", offset, "created", "desc");
    displayListings(data, listingsULElement, false);
  } else if (e.target.value === "oldest") {
    const data = await getListings("", offset, "created", "asc");
    displayListings(data, listingsULElement, false);
  } else if (e.target.value === "title-asc") {
    const data = await getListings("", offset, "title", "asc");
    displayListings(data, listingsULElement, false);
  } else if (e.target.value === "title-desc") {
    const data = await getListings("", offset, "title", "desc");
    displayListings(data, listingsULElement, false);
  } else if (e.target.value === "price-low-high") {
    sortByPrice("asc");
  } else if (e.target.value === "price-high-low") {
    sortByPrice("desc");
  }
}

async function sortByPrice(sortDirection) {
  const newArray = [];
  const data = await getListings("", offset, "title", "asc");
  data.map((listing) => {
    const highestBid = filterHighestBid(listing);
    const listingWithHighestBidProperty = { ...listing, highestBid };
    newArray.push(listingWithHighestBidProperty);
  });
  if (sortDirection === "asc") {
    sortDirection = sortByLowestInteger(newArray);
  } else if (sortDirection === "desc") {
    sortDirection = sortByHighestInteger(newArray);
  }
  const listingsPriceLowToHight = sortDirection;
  displayListings(listingsPriceLowToHight, listingsULElement, false);
}

// display all
// make fetch dynamic based on

// !to fetch all
// to get all listings
// globals
// let offset = 0;
// let limit = 0;
// let allData = [];

// run in function
//  const result = await fetchAll(offset);
// async function fetchAll() {
//   const data = await getListings("", offset);
//   if (data.length > 0) {
//     console.log(data.length);
//     offset += data.length;
//     allData.push(...data);
//     fetchAll();
//   } else {
//     console.log("no more listings");
//   }
// }
