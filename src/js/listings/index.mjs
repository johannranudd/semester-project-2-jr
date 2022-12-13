import { getListings, getAllListingsByProfile } from "../utils/gets.mjs";
import { displayListings } from "../utils/display.mjs";
import {
  filterHighestBid,
  sortByLowestInteger,
  sortByHighestIntegerBid,
} from "../utils/various.mjs";
import { loadingSpinner } from "../utils/loading.mjs";
import { getLocalStorage } from "../utils/storage.mjs";
const listingsULElement = document.querySelector("#listing");
const categories = document.querySelector("#sort-selector");
const btnCategory = document.querySelectorAll(".btn-category");

const resultsShowing = document.querySelector("#results-showing");
const loadMoreBtn = document.querySelector("#load-more-btn");

function geturlID() {
  const querystring = document.location.search;
  const mySearchParams = new URLSearchParams(querystring);
  const urlID = mySearchParams.get("id");
  return urlID;
}

let offset = 0;
let tag = "";
let limit = 50;
let newArray = [];

function refreshOrUpdateList(isAddingToPrevList) {
  if (
    window.location.href.includes("listings.html") ||
    window.location.href.includes("profile.html")
  ) {
    if (!isAddingToPrevList) {
      if (listingsULElement) {
        listingsULElement.innerHTML = "";
        loadingSpinner(listingsULElement);
      }
    } else {
      loadingSpinner(listingsULElement);
    }
  }
  if (categories) {
    categories.style.display = "inline";
    categories.previousElementSibling.style.display = "inline";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (categories) {
    categories.value = "newest";
  }
  displayBasedOnSort(false);
});
if (categories) {
  categories.addEventListener("change", () => {
    if (window.location.href.includes("listings.html")) {
      const stateObj = {};
      history.pushState(stateObj, "", `listings.html`);
    }
    offset = 0;
    displayBasedOnSort(false);
  });
}
if (btnCategory) {
  btnCategory.forEach((btn) => {
    btn.addEventListener("click", getTags);
  });
}

async function getTags(event) {
  const stateObj = {};
  history.pushState(stateObj, "", `listings.html`);
  offset = 0;
  tag = event.currentTarget.dataset.category.toLowerCase();
  if (tag === "various") {
    tag = "";
  }
  displayBasedOnSort(false);
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    displayBasedOnSort(true);
  });
}

function searchFn(searchValue, data) {
  const searchToLowerCase = searchValue.toLowerCase();
  let searchArray = [];
  data.filter((item) => {
    const title = item.title.toLowerCase();
    if (title.includes(searchToLowerCase)) {
      searchArray.push(item);
    } else {
      item.tags.filter((tag) => {
        const split = tag.split(",");
        const splitToLowerCase = split[0].toLowerCase();
        if (splitToLowerCase.includes(searchToLowerCase)) {
          searchArray.push(item);
        }
      });
    }
  });
  return searchArray;
}

function display(urlID) {
  refreshOrUpdateList(false);
  const hasTitle = searchFn(urlID, newArray);
  const reduce = hasTitle.reduce((total, current) => {
    if (!total.includes({ id: current.id })) {
      total.push(current);
    } else {
      return;
    }
    return total;
  }, []);
  displayListings(reduce, listingsULElement);

  if (categories) {
    categories.style.display = "none";
    categories.previousElementSibling.style.display = "none";
    resultsShowing.innerHTML = `Searched for: <span>${urlID} <span><br/> ${reduce.length} results</span></span>`;
    loadMoreBtn.style.display = "none";
  }
}

export async function displayBasedOnSort(isAddingToPrevList = false) {
  refreshOrUpdateList(isAddingToPrevList);
  const urlID = geturlID();
  if (window.location.href.includes("listings.html")) {
    if (urlID) {
      // !This max value could be changed to get more results
      limit = 100;
      offset = 0;
      newArray = [];
      let max = 9;
      for (let i = 0; i <= max; i++) {
        const data = await getListings(limit, offset, "", "", "");
        if (data.length > 0) {
          if (data.length < limit || i === max) {
            offset += data.length;
            newArray.push(...data);
            display(urlID);
            return;
          } else {
            newArray.push(...data);
            offset += data.length;
          }
        }
      }
    } else {
      if (categories.value === "newest") {
        const data = await getListings(limit, offset, "created", "desc", tag);
        checkOffsetDisplay(data);
      } else if (categories.value === "oldest") {
        const data = await getListings(limit, offset, "created", "asc", tag);
        checkOffsetDisplay(data);
      } else if (categories.value === "title-asc") {
        const data = await getListings(limit, offset, "title", "asc", tag);
        checkOffsetDisplay(data);
      } else if (categories.value === "title-desc") {
        const data = await getListings(limit, offset, "title", "desc", tag);
        checkOffsetDisplay(data);
      } else if (categories.value === "price-low-high") {
        sortByPrice("asc", getListings(limit, offset, "", "", tag));
      } else if (categories.value === "price-high-low") {
        sortByPrice("desc", getListings(limit, offset, "", "", tag));
      }
    }
  }
  if (window.location.href.includes("profile.html")) {
    if (urlID) {
      if (categories.value === "newest") {
        const data = await getAllListingsByProfile(
          limit,
          offset,
          "created",
          "desc",
          tag,
          urlID
        );
        checkOffsetDisplay(data);
      } else if (categories.value === "oldest") {
        const data = await getAllListingsByProfile(
          limit,
          offset,
          "created",
          "asc",
          tag,
          urlID
        );
        checkOffsetDisplay(data);
      } else if (categories.value === "title-asc") {
        const data = await getAllListingsByProfile(
          limit,
          offset,
          "title",
          "asc",
          tag,
          urlID
        );
        checkOffsetDisplay(data);
      } else if (categories.value === "title-desc") {
        const data = await getAllListingsByProfile(
          limit,
          offset,
          "title",
          "desc",
          tag,
          urlID
        );
        checkOffsetDisplay(data);
      } else if (categories.value === "price-low-high") {
        sortByPrice(
          "asc",
          getAllListingsByProfile(limit, offset, "", "", tag, urlID)
        );
      } else if (categories.value === "price-high-low") {
        sortByPrice(
          "desc",
          getAllListingsByProfile(limit, offset, "", "", tag, urlID)
        );
      }
    } else {
      const locStor = getLocalStorage();
      if (categories.value === "newest") {
        const data = await getAllListingsByProfile(
          limit,
          offset,
          "created",
          "desc",
          tag,
          locStor.name
        );
        checkOffsetDisplay(data);
      } else if (categories.value === "oldest") {
        const data = await getAllListingsByProfile(
          limit,
          offset,
          "created",
          "asc",
          tag,
          locStor.name
        );
        checkOffsetDisplay(data);
      } else if (categories.value === "title-asc") {
        const data = await getAllListingsByProfile(
          limit,
          offset,
          "title",
          "asc",
          tag,
          locStor.name
        );
        checkOffsetDisplay(data);
      } else if (categories.value === "title-desc") {
        const data = await getAllListingsByProfile(
          limit,
          offset,
          "title",
          "desc",
          tag,
          locStor.name
        );
        checkOffsetDisplay(data);
      } else if (categories.value === "price-low-high") {
        sortByPrice(
          "asc",
          getAllListingsByProfile(limit, offset, "", "", tag, locStor.name)
        );
      } else if (categories.value === "price-high-low") {
        sortByPrice(
          "desc",
          getAllListingsByProfile(limit, offset, "", "", tag, locStor.name)
        );
      }
    }
  }
}

function checkOffsetDisplay(data) {
  offset += data.length;
  displayListings(data, listingsULElement);
  resultsShowing.innerHTML = `Showing: <span>${categories.value}</span><span> ${tag}</span>`;
  if (data.length === 0) {
    loadMoreBtn.style.display = "none";
  }
}

async function sortByPrice(sortDirection, fetchMethod) {
  let newArray = [];
  const data = await fetchMethod;
  offset += data.length;
  if (data.length === 0) {
    loadMoreBtn.style.display = "none";
  }

  data.map((listing) => {
    const highestBid = filterHighestBid(listing);
    const listingWithHighestBidProperty = { ...listing, highestBid };
    newArray.push(listingWithHighestBidProperty);
  });
  if (sortDirection === "asc") {
    sortDirection = sortByLowestInteger(newArray);
    resultsShowing.innerHTML = `Showing: <span>Price (Low to high)</span><span> ${tag}</span>`;
  } else if (sortDirection === "desc") {
    sortDirection = sortByHighestIntegerBid(newArray);
    resultsShowing.innerHTML = `Showing: <span>Price (High to low)</span><span> ${tag}</span>`;
  }
  const listingsPriceLowToHight = sortDirection;
  displayListings(listingsPriceLowToHight, listingsULElement);
}
