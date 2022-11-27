import { getListings } from "../utils/gets.mjs";
import { displayListings } from "../utils/display.mjs";
import {
  getListingsStillForSale,
  filterHighestBid,
} from "../utils/various.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
const listingsULElement = document.querySelector("#listing");
const sortListingsForm = document.querySelector("#sort-listings-form");
const categories = document.querySelector("#categories");

let offset = 0;

window.addEventListener("DOMContentLoaded", displayBasedOnSort);

categories.addEventListener("change", displayBasedOnSort);

async function displayBasedOnSort(e) {
  listingsULElement.innerHTML = "";
  if (e.target.value === undefined) {
    loadingSpinner(listingsULElement);
    const data = await getListings("", offset, "created", "desc");
    displayListings(data, listingsULElement, false);
    // console.log(data);
  } else if (e.target.value === "newest") {
    loadingSpinner(listingsULElement);
    const data = await getListings("", offset, "created", "desc");
    displayListings(data, listingsULElement, false);
    console.log("newest");
  } else if (e.target.value === "oldest") {
    loadingSpinner(listingsULElement);
    const data = await getListings("", offset, "created", "asc");
    displayListings(data, listingsULElement, false);
    console.log("oldest");
  } else if (e.target.value === "title-asc") {
    loadingSpinner(listingsULElement);
    const data = await getListings("", offset, "title", "asc");
    displayListings(data, listingsULElement, false);
    console.log("title-asc");
  } else if (e.target.value === "title-desc") {
    loadingSpinner(listingsULElement);
    const data = await getListings("", offset, "title", "desc");
    displayListings(data, listingsULElement, false);
    console.log("title-desc");
  } else if (e.target.value === "price-low-high") {
    const data = await getListings("", offset, "title", "asc");
    // TODO: continue here
    data.map((listing) => {
      const test = filterHighestBid(listing);
      console.log(test);
    });
    // loadingSpinner(listingsULElement);
    // displayListings(data, listingsULElement, false);
    console.log("price-low-high");
  } else if (e.target.value === "price-high-low") {
    console.log("price-high-low");
  }

  //   getListings(limit, (offset = 0), sort, sortOrder);
  //   console.log(data);
}

// displayBasedOnSort();
// async function sortByCategories(e) {
//   if (e.target.value === "newest") {
//     const data = await getListings("", offset);
//     updateOffset(data);
//     // console.log(data);
//   }
// }

// function updateOffset(data) {
//   if (data.length > 0) {
//     offset += data.length;
//   }
// }

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
