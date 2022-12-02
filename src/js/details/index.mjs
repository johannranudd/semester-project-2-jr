import { getListings, getSingleListing } from "../utils/gets.mjs";
import { getLocalStorage } from "../utils/storage.mjs";

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

const auctionSection = document.querySelector("#auction-section");
const carousel = document.querySelector("#carousel");
const btnEditListing = document.querySelector("#edit-listing");

window.addEventListener("DOMContentLoaded", displaySignle);

async function displaySignle() {
  const locStor = getLocalStorage();
  const data = await getSingleListing(urlID);
  console.log(data);
  const { id, title, description, media, tags, seller, bids } = data;
  const carouselContent = `<div><img src="${media[0]}" alt="product image" /></div>`;
  carousel.innerHTML += carouselContent;

  btnEditListing.href = `../../../new-listing.html?id=${urlID}`;
  if (seller.name !== locStor.name) {
    btnEditListing.style.display = "none";
  }
}
