// POST /api/v1/auction/listings

// let sumbitObject = {
//   title: "string", // Required
//   description: "string", // Optional
//   tags: ["string"], // optional
//   media: ["https://url.com/image.jpg"], // Optional
//   endsAt: "2020-01-01T00:00:00.000Z", // Required - Instance of new Date()
// };

// grab all the inputs
const formNewListing = document.querySelector("#new-listing-form");

formNewListing.addEventListener("submit", (e) => {
  e.preventDefault();
  let sumbitObject = {};
  const allTextInputs = formNewListing.querySelectorAll('input[type="text"]');
  allTextInputs.forEach((input) => {
    console.log(input.value);
  });
});
// make a sumbitObject
// typechecking and warnings
// create a POST fetch
// redirect to listings with the newest created listings
