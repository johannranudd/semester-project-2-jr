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
  const stillForSale = getListingsStillForSale(sortedByMostBids);
  // const listingWithCountdownObject = addCountdownObject(stillForSale);
  // limit to
  const twentyMostPopular = stillForSale.slice(0, 20);
  // console.log(twentyMostPopular);
  displayListings(twentyMostPopular, listingsULElement);

  // let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // for (let i = 0; i <= arr.length; i++) {
  //   setTimeout(() => {
  //     console.log(`this is round ${i}`);
  //     if (i === arr.length) {
  //       // clearInterval(interval);
  //       console.log("---------LAST----------------");
  //     }
  //   }, i * 100);
  // }
}

window.addEventListener("DOMContentLoaded", filterTwentyMostPopular);
