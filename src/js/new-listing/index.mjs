// POST /api/v1/auction/listings
// let titleVal = formNewListing.querySelector("#title").value;
// let descriptionVal = formNewListing.querySelector("#description").value;
// let dateVal = formNewListing.querySelector("#endsAt").value;
// let tags = formNewListing.querySelector("#tags");
// let mediaVal = formNewListing.querySelector("#media").value;
import { postListing } from "../utils/posts.mjs";
import { getSingleListing } from "../utils/gets.mjs";
import { updateEntry } from "../utils/puts.mjs";

const formNewListing = document.querySelector("#new-listing-form");
let titleVal = formNewListing.querySelector("#title");
let descriptionVal = formNewListing.querySelector("#description");
let dateVal = formNewListing.querySelector("#endsAt");
let tags = formNewListing.querySelector("#tags");
let mediaVal = formNewListing.querySelector("#media");

const headline = document.querySelector("#create-or-edit-header");

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

window.addEventListener("DOMContentLoaded", async () => {
  if (!urlID) {
    headline.innerHTML = "Create New Listing";
  } else if (urlID) {
    mediaVal.parentElement.parentElement.style.display = "block";
    mediaVal.parentElement.style.display = "block";

    //
    //
    headline.innerHTML = "Edit Listing";
    dateVal.previousElementSibling.style.display = "none";
    dateVal.style.display = "none";
    const singleData = await getSingleListing(urlID);
    const { title, description, tags, media } = singleData;
    titleVal.value = title;
    descriptionVal.value = description;
    media.map((imageURL) => {
      mediaVal.value = imageURL;
    });
  }
});

formNewListing.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!urlID) {
    createNewListing();
  } else if (urlID) {
    editListing();
  }
});

async function editListing() {
  let submitObject = {};
  // title
  if (titleVal.value) {
    submitObject.title = titleVal.value;
  }
  // tags
  if (tags.value) {
    let selected = [];
    for (var option of tags.options) {
      if (option.selected) {
        selected.push(option.value.toLowerCase());
      }
    }
    submitObject.tags = selected;
  }
  // description
  if (descriptionVal.value) {
    submitObject.description = descriptionVal.value;
  }
  // media
  if (mediaVal.value) {
    const mediaArray = mediaVal.value.split(/[ ,]+/);
    submitObject.media = mediaArray;
  }
  console.log(submitObject);
  updateEntry(urlID, submitObject);
}

function createNewListing() {
  let submitObject = {};

  if (titleVal.value && dateVal.value && tags.value) {
    const now = new Date();
    const date = new Date(dateVal.value);
    if (date.getTime() > now.getTime()) {
      submitObject.title = titleVal.value;
      submitObject.endsAt = date.toISOString();

      let selected = [];
      for (var option of tags.options) {
        if (option.selected) {
          selected.push(option.value.toLowerCase());
        }
      }
      submitObject.tags = selected;
      if (descriptionVal.value) {
        submitObject.description = descriptionVal.value;
      }
      if (mediaVal.value) {
        const mediaArray = mediaVal.value.split(/[ ,]+/);
        submitObject.media = mediaArray;
      }
      // console.log(now.toISOString());
      console.log("submitObject", submitObject);
      postListing(submitObject);
      // window.location = "../../../listings.html";
    } else {
      console.log("smaller");
    }
  } else {
    // display warnings here
  }
}
