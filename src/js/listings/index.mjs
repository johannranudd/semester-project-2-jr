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
const categories = document.querySelector("#sort-selector");
const btnCategory = document.querySelectorAll(".btn-category");

const resultsShowing = document.querySelector("#results-showing");

// const sortSpan = document.querySelectorAll("#sort-span");
// const tagSpan = document.querySelectorAll("#tag-span");

let offset = 0;
let tag = "";
let sortValue = "";

window.addEventListener(
  "DOMContentLoaded",
  displayBasedOnSort(sortValue, false)
);

categories.addEventListener("change", displayBasedOnSort);
btnCategory.forEach((btn) => {
  btn.addEventListener("click", getTags);
});

async function getTags(event) {
  // TODO: come back here to filter after creating posts with apropriate tags
  // TODO: paginate
  // TODO: set tag = event.currentTarget.dataset.category.toLowerCase();
  // create a global var that changes so that each fetch gets it
  tag = event.currentTarget.dataset.category;
  displayBasedOnSort(categories.value, sortValue, false);
}

async function displayBasedOnSort(sortValue, isAddingToPrevList = false) {
  if (!isAddingToPrevList) {
    if (listingsULElement) {
      listingsULElement.innerHTML = "";
      loadingSpinner(listingsULElement);
    }
  } else {
    loadingSpinner(listingsULElement);
  }

  if (categories.value === "newest") {
    const data = await getListings("", offset, "created", "desc", tag);
    displayListings(data, listingsULElement, false);
    resultsShowing.innerHTML = `Showing: <span>Newest</span><span> ${tag}</span>`;
    sortValue = categories.value;
  } else if (categories.value === "oldest") {
    console.log(categories.value);
    const data = await getListings("", offset, "created", "asc", tag);
    displayListings(data, listingsULElement, false);
    resultsShowing.innerHTML = `Showing: <span>Oldest</span><span> ${tag}</span>`;
    sortValue = categories.value;
  } else if (categories.value === "title-asc") {
    const data = await getListings("", offset, "title", "asc", tag);
    displayListings(data, listingsULElement, false);
    resultsShowing.innerHTML = `Showing: <span>Title (asc)</span><span> ${tag}</span>`;
    sortValue = categories.value;
  } else if (categories.value === "title-desc") {
    const data = await getListings("", offset, "title", "desc", tag);
    displayListings(data, listingsULElement, false);
    resultsShowing.innerHTML = `Showing: <span>Title (desc)</span><span> ${tag}</span>`;
    sortValue = categories.value;
  } else if (categories.value === "price-low-high") {
    sortByPrice("asc", sortValue);
  } else if (categories.value === "price-high-low") {
    sortByPrice("desc", sortValue);
  }

  // console.log("sortValue::", sortValue);
  // console.log("tag:::", tag);
}

async function sortByPrice(sortDirection, sortValue) {
  const newArray = [];
  const data = await getListings("", offset, "title", "asc", tag);
  data.map((listing) => {
    const highestBid = filterHighestBid(listing);
    const listingWithHighestBidProperty = { ...listing, highestBid };
    newArray.push(listingWithHighestBidProperty);
  });
  if (sortDirection === "asc") {
    sortDirection = sortByLowestInteger(newArray);
    resultsShowing.innerHTML = `Showing: <span>Price (Low to high)</span><span> ${tag}</span>`;
    sortValue = categories.value;
  } else if (sortDirection === "desc") {
    sortDirection = sortByHighestInteger(newArray);
    resultsShowing.innerHTML = `Showing: <span>Price (High to low)</span><span> ${tag}</span>`;
    sortValue = categories.value;
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

// !srgrg
// console.log(tag);
// let newArr = [];
// const hasDefinedTag = data.filter((item) => {
//   if (
//     item.tags.length > 0 &&
//     !item.tags.includes("") &&
//     item.tags !== undefined
//   ) {
//     return item;
//   }
// });
// // clean array here
// const test = hasDefinedTag.map((item) => {
//   console.log(item.tags);
// });
