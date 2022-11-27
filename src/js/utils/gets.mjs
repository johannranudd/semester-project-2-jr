// `${baseURL}/profiles/${userName}?_posts=true&_following=true&_followers=true${limitQuery}`;
import { getLocalStorage } from "../utils/storage.mjs";
import { getListingsStillForSale } from "./various.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export async function getListings(limit, offset = 0, sort, sortOrder) {
  const locStor = getLocalStorage();
  const limitQuery = setFetchLimitURL(limit);
  const sortQuery = setSortQuery(sort);
  const sortOrderQuery = setSortOrderQuery(sortOrder);
  try {
    const res = await fetch(
      `${baseURL}/auction/listings?${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&offset=${offset}${limitQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${locStor.token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      const stillForSale = getListingsStillForSale(data);
      return stillForSale;
    }
  } catch (error) {
    console.log(error, "an error occured in getListings()");
  }
}

// `${baseURL}/auction/listings?_seller=true&_bids=true&offset=${offset}${limitQuery}`,

export function setFetchLimitURL(limit) {
  if (!limit) {
    return "";
  } else {
    let limitQuery = `&limit=${limit}`;
    return limitQuery;
  }
}

function setSortQuery(sort) {
  if (!sort) {
    return "";
  } else {
    let sortQuery = `sort=${sort}`;
    return sortQuery;
  }
}
function setSortOrderQuery(sortOrder) {
  if (!sortOrder) {
    return "";
  } else {
    let sortOrderQuery = `&sortOrder=${sortOrder}`;
    return sortOrderQuery;
  }
}
