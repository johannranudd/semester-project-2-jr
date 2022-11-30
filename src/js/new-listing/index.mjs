// POST /api/v1/auction/listings
import { getListings } from "../utils/gets.mjs";

// let sumbitObject = {
//   title: "string", // Required
//   description: "string", // Optional
//   tags: ["string"], // optional
//   media: ["https://url.com/image.jpg"], // Optional
//   endsAt: "2020-01-01T00:00:00.000Z", // Required - Instance of new Date()
// };

// grab all the inputs
const formNewListing = document.querySelector("#new-listing-form");

function createObject(input, object) {
  Object.keys(object).forEach(function (key) {
    if (key === input.name) {
      object[key] = input.value;
      if (!object[key]) {
        delete object[key];
      }
    }
  });
}

formNewListing.addEventListener("submit", (e) => {
  e.preventDefault();
  let sumbitObject = {
    title: "", // Required
    description: "", // Optional
    tags: [""], // optional
    media: [""], // Optional
    endsAt: "", // Required - Instance of new Date()
  };
  const allInputs = formNewListing.querySelectorAll("input");
  const tagsInput = formNewListing.querySelector("#tags");
  const descriptionText = formNewListing.querySelector("#description");
  allInputs.forEach((input) => {
    createObject(input, sumbitObject);
  });
  createObject(descriptionText, sumbitObject);
  createObject(tagsInput, sumbitObject);
  console.log(sumbitObject);
  // text inputs
  // const allTextInputs = formNewListing.querySelectorAll('input[type="text"]');
  // allTextInputs.forEach((input) => {
  //   console.log(input.name);
  // });
});
// make a sumbitObject
// typechecking and warnings
// create a POST fetch
// redirect to listings with the newest created listings

// async function test() {
//   const data = await getListings();
//   console.log(data);
// }
// test();
