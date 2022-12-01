// POST /api/v1/auction/listings
import { postListing } from "../utils/posts.mjs";
const formNewListing = document.querySelector("#new-listing-form");

formNewListing.addEventListener("submit", (e) => {
  e.preventDefault();
  let submitObject = {};
  const titleVal = formNewListing.querySelector("#title").value;
  const descriptionVal = formNewListing.querySelector("#description").value;
  const dateVal = formNewListing.querySelector("#endsAt").value;
  const tags = formNewListing.querySelector("#tags");
  const mediaVal = formNewListing.querySelector("#media").value;

  if (titleVal && dateVal && tags) {
    const now = new Date();
    const date = new Date(dateVal);
    if (date.getTime() > now.getTime()) {
      submitObject.title = titleVal;
      submitObject.endsAt = date.toISOString();

      let selected = [];
      for (var option of tags.options) {
        if (option.selected) {
          selected.push(option.value.toLowerCase());
        }
      }
      submitObject.tags = selected;
      if (descriptionVal) {
        submitObject.description = descriptionVal;
      }
      if (mediaVal) {
        const mediaArray = mediaVal.split(/[ ,]+/);
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
});
