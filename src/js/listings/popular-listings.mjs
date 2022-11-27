// https://api.noroff.dev/api/v1

import { getListings } from "../utils/gets.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
import {
  sortByMostBids,
  getListingsStillForSale,
  calculateTime,
  returnsTimeLeftInt,
  filterHighestBid,
  addCountdownObject,
} from "../utils/various.mjs";
import { displayListings } from "../utils/display.mjs";

const listingsULElement = document.querySelector("#listing");

async function filterTwentyMostPopular() {
  loadingSpinner(listingsULElement);
  const data = await getListings("", 0);
  const sortedByMostBids = sortByMostBids(data);
  // const stillForSale = getListingsStillForSale(sortedByMostBids);
  const listingWithCountdownObject = addCountdownObject(sortedByMostBids);
  // limit to 20
  const twentyMostPopular = listingWithCountdownObject.slice(0, 10);
  displayListings(twentyMostPopular, listingsULElement);
}

window.addEventListener("DOMContentLoaded", filterTwentyMostPopular);
