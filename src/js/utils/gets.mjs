// `${baseURL}/profiles/${userName}?_posts=true&_following=true&_followers=true${limitQuery}`;
import { getLocalStorage } from "../utils/storage.mjs";
import { getListingsStillForSale } from "./various.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export async function getListings(limit, offset = 0, sort, sortOrder, tag) {
  const locStor = getLocalStorage();
  const limitQuery = setFetchLimitURL(limit);
  const sortQuery = setSortQuery(sort);
  const sortOrderQuery = setSortOrderQuery(sortOrder);
  const tagQuery = setTagQuery(tag);
  try {
    const res = await fetch(
      `${baseURL}/auction/listings?${tagQuery}${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&offset=${offset}${limitQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${locStor.token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error, "an error occured in getListings()");
  }
}

export async function getSingleListing(id) {
  const locStor = getLocalStorage();
  try {
    const res = await fetch(
      `${baseURL}/auction/listings/${id}?_seller=true&_bids=true`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${locStor.token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error, "an error occured in getSingleListing()");
  }
}
export async function getAllListingsByProfile(
  limit,
  offset = 0,
  sort,
  sortOrder,
  tag,
  name
) {
  const locStor = getLocalStorage();
  const limitQuery = setFetchLimitURL(limit);
  const sortQuery = setSortQuery(sort);
  const sortOrderQuery = setSortOrderQuery(sortOrder);
  const tagQuery = setTagQuery(tag);
  try {
    const res = await fetch(
      `${baseURL}/auction/profiles/${name}/listings?${tagQuery}${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&offset=${offset}${limitQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${locStor.token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error, "an error occured in getAllListingsByProfile()");
  }
}

export function setTagQuery(tag) {
  if (!tag) {
    return "";
  } else {
    let tagQuery = `_tag=${tag}`;
    return tagQuery;
  }
}
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
    let sortQuery = `&sort=${sort}`;
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
