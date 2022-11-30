// POST /api/v1/auction/listings
import { getListings } from "../utils/gets.mjs";
// import { createSubmitObject } from "../utils/various.mjs";
// import { postListing } from "../utils/posts.mjs";
const formNewListing = document.querySelector("#new-listing-form");

formNewListing.addEventListener("submit", (e) => {
  e.preventDefault();
  let sumbitObject = {
    title, // Required
    description, // Optional
    tags: [], // optional
    media: [], // Optional
    endsAt, // Required - Instance of new Date()
  };
  const titleVal = formNewListing.querySelector("#title").value;
  const descriptionVal = formNewListing.querySelector("#description").value;
  const dateVal = formNewListing.querySelector("#endsAt").value;
  const tags = formNewListing.querySelector("#tags");
  const mediaVal = formNewListing.querySelector("#media");

  if (titleVal && dateVal && tags) {
    sumbitObject.title = titleVal;
    // const opt = tags.options;
    let selected = [];
    for (var option of tags.options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    console.log(selected);
  } else {
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

  console.log(sumbitObject);
  // postListing(sumbitObject);
});
