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
  const data = await getListings();
  const sortedByMostBids = sortByMostBids(data);
  // const stillForSale = getListingsStillForSale(sortedByMostBids);
  // const listingWithCountdownObject = addCountdownObject(stillForSale);
  // limit to
  const twentyMostPopular = sortedByMostBids.slice(0, 20);
  // console.log(twentyMostPopular);
  displayListings(twentyMostPopular, listingsULElement);
}

window.addEventListener("DOMContentLoaded", filterTwentyMostPopular);
