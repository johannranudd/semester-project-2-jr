import {
  getSingleProfile,
  getListings,
  getSingleListing,
  getAllProfiles,
  // getListingsUnathorized,
} from "../utils/gets.mjs";
import { getLocalStorage } from "../utils/storage.mjs";

import { deleteEntry } from "../utils/deletes.mjs";
import {
  filterHighestBid,
  returnsTimeLeftInt,
  addCountdownObject,
  sortByHighestInteger,
  calculateTime,
} from "../utils/various.mjs";
import { loadingSpinner, removeSpinner } from "../utils/loading.mjs";
import { bidOnEntry } from "../utils/posts.mjs";

const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

const carouselSection = document.querySelector("#carousel-section");
const main = document.querySelector("main");

const carousel = document.querySelector("#carousel");
const btnEditListing = document.querySelector("#edit-listing");

const btnDeleteListing = document.querySelector("#delete-listing");
const controlsCarousel = document.querySelector("#carousel-controls");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

// seller section
const sellerSection = document.querySelector("#seller-section");
const sellerTitle = sellerSection.querySelector("h2");
const sellerUsername = sellerSection.querySelector("h6");
const sellerProfileImg = sellerSection.querySelector("#profile img");
const sellerDescription = sellerSection.querySelector("#desc");

// auction section
const liveAuctionSection = document.querySelector("#live-auction-section");
const listOfProfilImg = liveAuctionSection.querySelector(
  "#bidders-profile-image-list"
);
const biddersProfileListElem = document.querySelector("#bidders-profile-list");

// submit bid
const placeBidForm = document.querySelector("#bid-form");

let counter = 0;
let showLimit = 4;

window.addEventListener("DOMContentLoaded", displaySignle);
// window.addEventListener("DOMContentLoaded", getListingsUnathorized);

placeBidForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amountInput = placeBidForm.querySelector("#amount");
  const valueToNumber = Number(amountInput.value);
  if (valueToNumber) {
    let submitObject = { amount: valueToNumber };
    bidOnEntry(submitObject, urlID);
  }
});

async function displaySignle() {
  loadingSpinner(biddersProfileListElem);
  const locStor = getLocalStorage();
  const data = await getSingleListing(urlID);

  // console.log(data);
  if (data) {
    removeSpinner(biddersProfileListElem);
    const { id, title, description, media, tags, seller, bids, endsAt } = data;

    if (media.length === 0) {
      const carouselItem = document.createElement("li");
      carouselItem.classList.add("carousel-image-container");
      const carouselImage = document.createElement("img");
      carouselImage.src = "../../../assets/images/placeholder.png";
      carouselItem.appendChild(carouselImage);
      carousel.appendChild(carouselItem);
    } else {
      media.map((image, index) => {
        displayCarousel(image, index);
      });
      const navDots = document.querySelectorAll(".nav-dot");
      navDots.forEach((dot) => {
        dot.style.transform = `translateX(calc(-100% * ${navDots.length})`;
      });
    }

    // edit
    btnEditListing.href = `/new-listing.html?id=${urlID}`;
    if (seller.name !== locStor.name) {
      btnEditListing.parentElement.style.display = "none";
      btnDeleteListing.parentElement.style.display = "none";
    }
    // delete
    btnDeleteListing.addEventListener("click", () => deleteEntry(urlID));
    // sellerSection
    sellerTitle.textContent = title;
    sellerUsername.textContent = seller.name;
    sellerProfileImg.src = seller.avatar && seller.avatar;
    sellerProfileImg.addEventListener("error", () => {
      sellerProfileImg.src = "../../../assets/images/profile-img.png";
    });
    sellerDescription.textContent = description;

    const newArray = data.bids.slice();
    const reverseArray = newArray.reverse();
    // const test = sortByHighestInteger(newArray);
    reverseArray.map(async (bid, index) => {
      if (index > showLimit) {
        return;
      } else {
        const { amount, bidderName, created } = bid;
        biddersProfileListElem.innerHTML += `<li class="bidder-status flex items-center justify-between">
        <div class="flex items-center">
        <img class="bidder-profile-image" />
        <div class="flex flex-col">
        <h5>${bidderName}</h5>
        <p class="time-since-bid" data-created="${created}"></p>
        </div>
        </div>
        <p><span>$ ${amount}</span></p></li>`;
      }
    });
    const timeSinceBidElem =
      biddersProfileListElem.querySelectorAll(".time-since-bid");
    timeSinceBidFn(timeSinceBidElem);

    const listElem = biddersProfileListElem.querySelectorAll("li");
    // get unique bidders
    const reduce = reverseArray.reduce((total, current) => {
      if (!total.includes(current.bidderName)) {
        total.push(current.bidderName);
      }
      return total;
    }, []);

    reduce.map(async (bidderName, index) => {
      if (index > showLimit) {
        return;
      } else {
        setTimeout(async () => {
          const profile = await getSingleProfile(bidderName);
          const { avatar } = profile;
          displayProfileImages(profile, listElem);
          listOfProfilImg.innerHTML += `<li><img class="w-8 h-8 object-cover rounded-full border-solid border-2 border-whiteClr" src="${
            avatar ? avatar : "../../../assets/images/profile-img.png"
          }" alt="profile image of ${
            profile.name
          }" onerror="this.src='../../../assets/images/profile-img.png';" /></li>`;
        }, 1000);
      }
    });

    const amountOfBidsText =
      liveAuctionSection.querySelector(".amount-of-bids");
    amountOfBidsText.textContent = `${reverseArray.length}bids`;
    const highestBidElem = liveAuctionSection.querySelector("#highest-bid");
    const highestBid = filterHighestBid(data);
    highestBidElem.textContent = `$ ${highestBid}`;

    setInterval(() => displayCountdownTimer(data), 1000);
  } // if (data) end
}
function displayProfileImages(profile, listElem) {
  listElem.forEach((elem, index) => {
    if (index > showLimit) {
      return;
    } else {
      const image = elem.querySelector("img");
      const header = elem.querySelector("h5");
      const { avatar } = profile;
      if (header.textContent === profile.name) {
        image.src = avatar && avatar;
        image.addEventListener("error", () => {
          image.src = "../../../assets/images/profile-img.png";
        });
        image.alt = `profile image of ${profile.name}`;
        image.classList.add(
          "w-12",
          "h-12",
          "object-cover",
          "rounded-full",
          "border-solid",
          "border-2",
          "border-primaryClr"
        );
      }
    }
  });
}
function timeSinceBidFn(timeSinceBidElem) {
  timeSinceBidElem.forEach((bid, index) => {
    if (index > showLimit) {
      return;
    } else {
      const created = bid.dataset.created;

      const now = new Date().getTime();
      const createdToInt = new Date(created).getTime();
      const timeLeft = now - createdToInt;
      const timeObj = calculateTime(timeLeft);
      const { days, hours, minutes, seconds } = timeObj;

      if (days) {
        bid.innerHTML = `${days}<small>d</small>`;
      } else if (hours) {
        bid.innerHTML = `${hours}<small>h</small>`;
      } else if (minutes) {
        bid.innerHTML = `${minutes}<small>m</small>`;
      } else if (seconds) {
        bid.innerHTML = `${seconds}<small>s</small>`;
      }
    }
  });
}

function displayCountdownTimer(data) {
  const timeLeftElem = liveAuctionSection.querySelector("#time-left");
  const modifiedObject = addCountdownObject(data);
  const { days, hours, minutes, seconds } = modifiedObject.countDownObject;
  const countDownString = `${days}<span>d</span> ${hours}<span>h</span>  ${minutes}<span>m</span>  ${seconds}<span>s</span> `;
  const sumOfTIme = days + hours + minutes + seconds;
  if (sumOfTIme <= 0) {
    timeLeftElem.innerHTML = "<p>SOLD</p>";
    return;
  } else {
    timeLeftElem.innerHTML = countDownString;
  }
}

nextBtn.addEventListener("click", () => {
  const carouselItem = document.querySelectorAll(".carousel-image-container");
  // next slide
  if (counter >= carouselItem.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  carouselItem.forEach((item, index) => {
    slideFn(item, index);
  });
});

prevBtn.addEventListener("click", () => {
  const carouselItem = document.querySelectorAll(".carousel-image-container");
  // prev slide
  if (counter <= 0) {
    counter = carouselItem.length - 1;
  } else {
    counter--;
  }
  carouselItem.forEach((item, index) => {
    slideFn(item, index);
  });
});

function displayCarousel(image, index) {
  const carouselItem = document.createElement("li");
  carouselItem.classList.add("carousel-image-container");

  const carouselImage = document.createElement("img");
  carouselImage.src = image;
  carouselImage.alt = `product image ${index}`;

  const navDot = document.createElement("span");
  // const navDotContainer = document.createElement("div");
  // navDotContainer.appendChild(navDot);

  navDot.classList.add("nav-dot");
  navDot.style.height = "7px";
  navDot.style.width = "7px";
  navDot.style.borderRadius = "50%";
  navDot.style.backgroundColor = "grey";
  navDot.style.position = "absolute";
  navDot.style.bottom = "10px";
  navDot.style.zIndex = "9";
  navDot.style.marginLeft = `${index * 15}px`;
  navDot.style.left = "50%";
  // navDot.style.transform = `translateX(calc(-100% * 3)`;

  carousel.appendChild(navDot);

  // open modal
  carouselImage.addEventListener("click", () => {
    toggleModal(image, index);
  });

  carouselItem.appendChild(carouselImage);

  slideFn(carouselItem, index);

  carousel.appendChild(carouselItem);
}

function slideFn(carouselItem, index) {
  carouselItem.classList.remove("prev-slide", "next-slide", "current-slide");
  const navDot = document.querySelectorAll(".nav-dot");
  navDot.forEach((dot, dotIndex) => {
    if (dotIndex === counter) {
      dot.style.backgroundColor = "black";
    } else {
      dot.style.backgroundColor = "gray";
    }
  });

  if (index === counter) {
    carouselItem.classList.add("current-slide");
  } else if (index > counter) {
    carouselItem.classList.add("next-slide");
  } else if (index < counter) {
    carouselItem.classList.add("prev-slide");
  }
}

function toggleModal(image, index) {
  const backdrop = document.createElement("div");
  backdrop.classList.add(
    "modal-backdrop",
    "absolute",
    "top-0",
    "left-0",
    "right-0",
    "bottom-0",
    "w-full",
    "z-50",
    "bg-blackClr",
    "opacity-75",
    "cursor-pointer"
  );
  const modal = document.createElement("div");
  modal.classList.add(
    "image-modal",
    "fixed",
    "top-0",
    "left-0",
    "right-0",
    "bottom-0",
    "z-50",
    "grid",
    "items-center",
    "cursor-pointer"
  );
  // backdrop.appendChild(modal);
  modal.innerHTML = `<img src="${image}" class="mx-auto max-w-[90%] max-h-[90vh]" alt="product image ${index}" />`;
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  // close
  const imageModal = document.querySelector(".image-modal");
  imageModal.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") {
      document.body.removeChild(backdrop);
      document.body.removeChild(modal);
    }
  });
}
