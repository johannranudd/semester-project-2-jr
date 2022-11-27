// https://api.noroff.dev/api/v1

import { getListings } from "../utils/gets.mjs";
import { loadingSpinner, removeSpinner } from "../utils/loading.mjs";

const listingsULElement = document.querySelector("#listing");

async function filterTwentyMostPopular() {
  loadingSpinner(listingsULElement);
  const data = await getListings();

  const sortedByMostBids = sortByMostBids(data);

  const stillForSale = getListingsStillForSale(sortedByMostBids);

  const listingWithCountdownObject = addCountdownObject(stillForSale);

  // limit to 20
  const twentyMostPopular = listingWithCountdownObject.slice(0, 10);
  displayListings(twentyMostPopular, listingsULElement);
}

function displayListings(data, listElement, isAddingToPrevList = false) {
  if (!isAddingToPrevList) {
    if (listElement) {
      listElement.innerHTML = "";
      loadingSpinner(listingsULElement);
    }
  }

  if (data) {
    removeSpinner();
    data.map((listing) => {
      const {
        id,
        title,
        media,
        seller,
        bids,
        _count,
        endsAt,
        countDownObject,
        description,
      } = listing;
      // const { days, hours, minutes, seconds } = countDownObject;
      const highestBid = filterHighestBid(listing);
      // const countDownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      console.log(listing);
      const listItem = ` 
             <div class="card">
                    <a href="#" class="image-container">
                         <img src="${
                           media[0]
                             ? media[0]
                             : "../../../assets/images/placeholder.png"
                         }" alt="Lsiting image" />
                    </a>
              <div class="text-content">
                <div class="title-and-price">
                  <h5 class="title">${title}</h5>
                  <p class="price">$ <span> ${highestBid}</span></p>
                </div>
                <p class="seller">${seller.name}</p>
                  <p class="description">${
                    description ? description : "No description"
                  }</p>
              </div>
            </div>
          `;
      listElement.innerHTML += listItem;
    });
  }
}

window.addEventListener("DOMContentLoaded", filterTwentyMostPopular);

// sort by most bids
function sortByMostBids(data) {
  return data.sort((a, b) => {
    if (a.bids.length < b.bids.length) {
      return 1;
    } else {
      return -1;
    }
  });
}

// get listing still for sale
function getListingsStillForSale(data) {
  return data.filter((listing) => {
    if (listing.bids.length > 0) {
      const timeLeft = returnsTimeLeftInt(listing);
      if (timeLeft > 0) {
        return listing;
      }
    }
  });
}

function calculateTime(timeLeft) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function returnsTimeLeftInt(listing) {
  const { endsAt } = listing;
  const now = new Date().getTime();
  const countDownDate = new Date(endsAt).getTime();
  return countDownDate - now;
}

function filterHighestBid(listings) {
  const highestBid = listings.bids.reduce((accumulator, currentValue) => {
    accumulator.push(currentValue.amount);
    return accumulator;
  }, []);
  return Math.max(...highestBid);
}

// modify listings still fro sale (give it a countdown object)
function addCountdownObject(data) {
  return data.map((listing) => {
    const timeLeft = returnsTimeLeftInt(listing);
    const countDownObject = calculateTime(timeLeft);
    return {
      ...listing,
      countDownObject,
    };
  });
}
