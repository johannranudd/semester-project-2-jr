// if (categories.value === "newest") {
//   const data = await getListings(limit, offset, "created", "desc", tag);
//   console.log(data);
//   const stillForSale = getListingsStillForSale(data);
//   console.log(stillForSale);
//   // const page = stillForSale.slice(0, pageNumber);
//   // console.log(page);
//   offset += limit;
//   if (stillForSale.length <= 0) {
//     console.log("out of listings!!!!!!!!!!!!!!!!!!");
//     loadMoreBtn.style.display = "none";
//   }
//   displayListings(stillForSale, listingsULElement, isAddingToPrevList);
//   resultsShowing.innerHTML = `Showing: <span>Newest</span><span> ${tag}</span>`;
//   if (stillForSale.length === 0) {
//     resultsShowing.innerHTML += ` > ${stillForSale.length} results`;
//   }
//   sortValue = categories.value;
// }
