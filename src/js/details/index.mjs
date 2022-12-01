import { getListings, getSingleListing } from "../utils/gets.mjs";

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

window.addEventListener("DOMContentLoaded", displaySignle);

async function displaySignle() {
  const data = await getSingleListing(urlID);
  console.log(data);
}
