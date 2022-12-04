import { getListings, getSingleListing } from "../utils/gets.mjs";
import { getLocalStorage } from "../utils/storage.mjs";

import { deleteEntry } from "../utils/deletes.mjs";


const querystring = document.location.search;
const mySearchParams = new URLSearchParams(querystring);
const urlID = mySearchParams.get("id");

const carouselSection = document.querySelector("#carousel-section");

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

let counter = 0;


window.addEventListener("DOMContentLoaded", displaySignle);

async function displaySignle() {
  const locStor = getLocalStorage();
  const data = await getSingleListing(urlID);

  // console.log(data);
  const { id, title, description, media, tags, seller, bids } = data;
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
  sellerProfileImg.src = seller.avatar;
  sellerDescription.textContent = description;
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
