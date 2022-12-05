import {
  getSingleProfile,
  getListings,
  getSingleListing,
  getAllProfiles,
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

let counter = 0;
let showLimit = 4;

window.addEventListener("DOMContentLoaded", displaySignle);

async function displaySignle() {
  loadingSpinner(biddersProfileListElem);
  const locStor = getLocalStorage();
  const data = await getSingleListing(urlID);

  // console.log(data);
  if (data) {
    removeSpinner(biddersProfileListElem);
    const { id, title, description, media, tags, seller, bids, endsAt } = data;
    media.map((image, index) => {
      displayCarousel(image, index);
    });

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
    sellerProfileImg.src = seller.avatar
      ? seller.avatar
      : "../../../assets/images/profile-img.png";
    sellerDescription.textContent = description;

    const newArray = data.bids.slice();
    const reverseArray = newArray.reverse();
    // const test = sortByHighestInteger(newArray);
    reverseArray.map(async (bid, index) => {
      const { amount, bidderName, created } = bid;
      if (index > showLimit) {
        return;
      } else {
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
      // console.log(created);

      // created

      // const countDownString = `${days}<span>d</span> ${hours}<span>h</span>  ${minutes}<span>m</span>  ${seconds}<span>s</span> `;

      // console.log(timeSinceBid);
      // console.log(countDownString);

      // console.log(created.getTime());
    });
    const timeSinceBidElem =
      biddersProfileListElem.querySelectorAll(".time-since-bid");
    timeSinceBidFn(timeSinceBidElem);

    const listElem = biddersProfileListElem.querySelectorAll("li");
    listElem.forEach(async (elem, index) => {
      if (index > showLimit) {
        return;
      } else {
        const image = elem.querySelector("img");
        const header = elem.querySelector("h5");
        const profile = await getSingleProfile(header.textContent);
        const { avatar } = profile;
        image.src = avatar ? avatar : "../../../assets/images/profile-img.png";
        image.alt = `profile image of ${header.textContent}`;
        image.classList.add(
          "w-12",
          "h-12",
          "object-cover",
          "rounded-full",
          "border-solid",
          "border-2",
          "border-primaryClr"
        );

        listOfProfilImg.innerHTML += `<li><img class="w-8 h-8 object-cover rounded-full border-solid border-2 border-whiteClr" src="${
          avatar ? avatar : "../../../assets/images/profile-img.png"
        }" alt="profile image of ${header.textContent}" /></li>`;
      }
    });

    const amountOfBidsText =
      liveAuctionSection.querySelectorAll(".amount-of-bids");
    amountOfBidsText.forEach((elem) => {
      elem.textContent = `${reverseArray.length}bids`;
    });
    const highestBidElem = liveAuctionSection.querySelector("#highest-bid");
    const highestBid = filterHighestBid(data);
    highestBidElem.textContent = `$ ${highestBid}`;

    setInterval(() => displayCountdownTimer(data), 1000);
  } // if (data) end
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
// async function getImage() {
//   // const test = await getAllProfiles();
//   // console.log(test);
//   const bidderElem = document.querySelectorAll(".bidder-status");
//   const imageElem = document.querySelectorAll(".bidder-profile-image");
//   const bidderElemHeader = document.querySelectorAll(".bidder-status h5");

//   bidderElemHeader.forEach(async (header) => {
//     const profile = await getSingleProfile(header.textContent);
//     console.log(profile);
//   });

// }

function displayCountdownTimer(data) {
  const timeLeftElem = liveAuctionSection.querySelector("#time-left");
  const modifiedObject = addCountdownObject(data);
  const { days, hours, minutes, seconds } = modifiedObject.countDownObject;
  const countDownString = `${days}<span>d</span> ${hours}<span>h</span>  ${minutes}<span>m</span>  ${seconds}<span>s</span> `;
  timeLeftElem.innerHTML = countDownString;
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
  navDot.style.transform = `translateX(calc(-100% * 4))`;

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
