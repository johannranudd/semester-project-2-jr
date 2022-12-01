import { loadingSpinner, removeSpinner } from "./loading.mjs";
import { filterHighestBid, getListingsStillForSale } from "./various.mjs";

export function displayListings(data, listElement) {
  const stillForSale = getListingsStillForSale(data);
  if (stillForSale) {
    removeSpinner();
    stillForSale.map((listing) => {
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
      const highestBid = filterHighestBid(listing);
      const listItem = `<div class="card">
                    <a href="details.html?id=${id}" class="image-container">
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
            </div>`;
      listElement.innerHTML += listItem;
      const descriptionTexts = document.querySelectorAll(".description");
      descriptionTexts.forEach((descriptionText) => {
        if (descriptionText.innerHTML.length > 100) {
          descriptionText.innerHTML = `${descriptionText.innerHTML.substring(
            0,
            100
          )}...`;
        }
      });
    });
  }
}
