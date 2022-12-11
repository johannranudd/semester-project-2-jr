import { getListings } from "../utils/gets.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
import { sortByMostBids } from "../utils/various.mjs";
import { displayListings } from "../utils/display.mjs";

const listingsULElement = document.querySelector("#listing");

async function filterTwentyMostPopular() {
  loadingSpinner(listingsULElement);
  const data = await getListings();
  const sortedByMostBids = sortByMostBids(data);
  // limit to
  const twentyMostPopular = sortedByMostBids.slice(0, 20);
  displayListings(twentyMostPopular, listingsULElement);
}

window.addEventListener("DOMContentLoaded", filterTwentyMostPopular);
