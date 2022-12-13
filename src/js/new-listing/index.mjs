import { postListing } from "../utils/posts.mjs";
import { getSingleListing } from "../utils/gets.mjs";
import { updateEntry } from "../utils/puts.mjs";

const formNewListing = document.querySelector("#new-listing-form");
let titleVal = formNewListing.querySelector("#title");
let descriptionVal = formNewListing.querySelector("#description");
let dateVal = formNewListing.querySelector("#endsAt");
let tags = formNewListing.querySelector("#tags");
let mediaVal = formNewListing.querySelector("#media");
let timeExpiration = formNewListing.querySelector("#time-of-expiration");

const headline = document.querySelector("#create-or-edit-header");

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

window.addEventListener("DOMContentLoaded", async () => {
  if (!urlID) {
    headline.innerHTML = "Create New Listing";
  } else if (urlID) {
    headline.innerHTML = "Edit Listing";
    dateVal.previousElementSibling.style.display = "none";
    timeExpiration.style.display = "none";
    dateVal.style.display = "none";
    const singleData = await getSingleListing(urlID);

    const { title, description, tags, media } = singleData;
    titleVal.value = title;
    descriptionVal.value = description;
    media.map((imageURL) => {
      mediaVal.value += imageURL;
      mediaVal.value += ", ";
    });
    const withoutLastComma = mediaVal.value.slice(0, -2);
    mediaVal.value = withoutLastComma;
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
  updateEntry(urlID, submitObject);
}

function createNewListing() {
  let submitObject = {};

  const dateWarning = dateVal.previousElementSibling;

  const hourString = `${dateVal.value} ${timeExpiration.value}`;
  if (titleVal.value && dateVal.value && tags.value) {
    const now = new Date();
    const date = new Date(hourString);
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
      postListing(submitObject);
    } else {
      dateWarning.innerHTML =
        "Ends at<br/><small>Must be a future date</small>";
    }
  } else {
    dateWarning.innerHTML = "Ends at<br/><small>Please select a date</small>";
  }
  const small = dateWarning.querySelector("small");
  if (small) {
    small.style.color = "red";
  }
}
