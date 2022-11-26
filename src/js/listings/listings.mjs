// https://api.noroff.dev/api/v1

import { getListings } from "../utils/gets.mjs";
import { loadingSpinner, removeSpinner } from "../utils/loading.mjs";

const listingsULElement = document.querySelector("#listing");

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

async function filterTwentyMostPopular() {
  loadingSpinner(listingsULElement);
  const data = await getListings();

  // sort by most bids
  const sortedByMostBids = data.sort((a, b) => {
    if (a.bids.length < b.bids.length) {
      return 1;
    } else {
      return -1;
    }
  });

  // get listing still for sale
  const stillForSale = sortedByMostBids.filter((listing) => {
    if (listing.bids.length > 0) {
      const timeLeft = returnsTimeLeftInt(listing);
      if (timeLeft > 0) {
        return listing;
      }
    }
  });

  // modify listings still fro sale
  const modifiedStillForSale = stillForSale.map((listing) => {
    const timeLeft = returnsTimeLeftInt(listing);
    const countDownObject = calculateTime(timeLeft);
    return {
      ...listing,
      countDownObject,
    };
  });

  // limit to 20
  const twentyMostPopular = modifiedStillForSale.slice(0, 10);
  displayListings(data, listingsULElement);
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
    // !test
    data.map((listings) => {
      const { id, media, seller, bids, _count, endsAt, countDownObject } =
        listings;
      // const { days, hours, minutes, seconds } = countDownObject;
      // const highestBid = filterHighestBid(listings);
      // const countDownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      // const allMedia = media.map((image) => {
      // return image;
      // });
      // console.log(media);
      const listItem = ` 
             <div class="rounded-lg shadow-lg bg-white max-w-sm">
               <a href="#">
                 <img
                   class="rounded-t-lg"
                   src="${media.map((image) => {
                     return image;
                   })}"
                  alt=""
                />
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">
                  ${seller.name}
                </h5>
                <p class="text-gray-700 text-base mb-4">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          `;
      listingsULElement.innerHTML += listItem;
    });
    // !test
    // data.map((listings) => {
    //   const { id, media, seller, bids, _count, endsAt, countDownObject } =
    //     listings;
    //   const { days, hours, minutes, seconds } = countDownObject;
    //   const highestBid = filterHighestBid(listings);
    //   const countDownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    //   const allMedia = media.map((image) => {
    //     return image;
    //   });
    //   // console.log(media);
    //   const listItem = ` <div class="flex justify-center">
    //         <div class="rounded-lg shadow-lg bg-white max-w-sm">
    //           <a href="#">
    //             <img
    //               class="rounded-t-lg"
    //               src="${media.map((image) => {
    //                 return image;
    //               })}"
    //               alt=""
    //             />
    //           </a>
    //           <div class="p-6">
    //             <h5 class="text-gray-900 text-xl font-medium mb-2">
    //               ${seller.name}
    //             </h5>
    //             <p class="text-gray-700 text-base mb-4">
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </p>
    //           </div>
    //         </div>
    //       </div>`;
    //   list.innerHTML += listItem;
    // });
  }
}

window.addEventListener("DOMContentLoaded", filterTwentyMostPopular);
