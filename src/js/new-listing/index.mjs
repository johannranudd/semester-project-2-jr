// POST /api/v1/auction/listings
// 3d486168-1380-41e0-b552-66e3fd038a22
import { getListings } from "../utils/gets.mjs";
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
      submitObject.endsAt = date;

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
      postListing(submitObject);
      // window.location = "../../../listings.html";
    }
  } else {
    // display warnings here
  }

  // createSubmitObject(descriptionText, sumbitObject);
  // createSubmitObject(tagsInput, sumbitObject);

  // function deleteEmptyKeys(input, object) {
  //   Object.keys(object).forEach(function (key) {
  //     if (key === input.name) {
  //       // object[key] = input.value;
  //       if (!object[key]) {
  //         delete object[key];
  //       }
  //     }
  //   });
  // }

  // console.log(submitObject);
  // postListing(sumbitObject);
});
