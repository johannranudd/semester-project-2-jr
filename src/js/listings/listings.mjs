// https://api.noroff.dev/api/v1

import { getListings } from "../utils/gets.mjs";
import { loadingSpinner, removeSpinner } from "../utils/loading.mjs";

const listingsULElement = document.querySelector("#listing");

async function filterTwentyMostPopular() {
  loadingSpinner(listingsULElement);
  const data = await getListings();
  const sortedByMostBids = data.sort((a, b) => {
    if (a.bids.length < b.bids.length) {
      return 1;
    } else {
      return -1;
    }
  });
  const twentyMostPopular = sortedByMostBids.slice(0, 20);
  displayListings(twentyMostPopular, listingsULElement, false);
}

function filterHighestBid(listings) {
  const highestBid = listings.bids.reduce((accumulator, currentValue) => {
    accumulator.push(currentValue.amount);
    return accumulator;
  }, []);
  return Math.max(...highestBid);
}

function displayListings(data, list, isAddingToPrevList = false) {
  if (!isAddingToPrevList) {
    if (list) {
      list.innerHTML = "";
      loadingSpinner(listingsULElement);
    }
  }
  if (data) {
    removeSpinner();
    // console.log(data);
    data.map((listings) => {
      // const highestBid = filterHighestBid(listings);
      const { id, media, seller, bids, _count, endsAt } = listings;
      getTimeLeftOfListing(endsAt);
    });
  }
}

function getTimeLeftOfListing(endsAt) {
  const currentDate = Date.now();
  // convert endsAt to number
  // time left = endsAt - currentDate
  // multiply by 60 or other number to get const {day, hour, minute, second}
}

window.addEventListener("DOMContentLoaded", filterTwentyMostPopular);
