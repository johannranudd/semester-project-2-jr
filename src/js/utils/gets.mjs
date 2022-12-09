// `${baseURL}/profiles/${userName}?_posts=true&_following=true&_followers=true${limitQuery}`;
import { getLocalStorage } from "../utils/storage.mjs";
import { getListingsStillForSale } from "./various.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export async function getListings(limit, offset = 0, sort, sortOrder, tag) {
  // const locStor = getLocalStorage();
  const limitQuery = setFetchLimitURL(limit);
  const sortQuery = setSortQuery(sort);
  const sortOrderQuery = setSortOrderQuery(sortOrder);
  const tagQuery = setTagQuery(tag);
  try {
    const res = await fetch(
      `${baseURL}/auction/listings?${tagQuery}${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&_active=true&offset=${offset}${limitQuery}`
    );
    if (res.ok) {
      const data = await res.json();
      // const stillForSale = getListingsStillForSale(data);
      return data;
    }
  } catch (error) {
    console.log(error, "an error occured in getListings()");
  }
  // console.log(
  //   `${baseURL}/auction/listings?${tagQuery}${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&_active=true&offset=${offset}${limitQuery}`
  // );
}

// export async function search(limit, offset = 0, sort, sortOrder, tag) {
//   // const locStor = getLocalStorage();
//   const limitQuery = setFetchLimitURL(limit);
//   const sortQuery = setSortQuery(sort);
//   const sortOrderQuery = setSortOrderQuery(sortOrder);
//   const tagQuery = setTagQuery(tag);
//   try {
//     const res = await fetch(
//       `${baseURL}/auction/listings?${tagQuery}${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&_active=true&offset=${offset}${limitQuery}`
//     );
//     if (res.ok) {
//       const data = await res.json();
//       // const stillForSale = getListingsStillForSale(data);
//       return data;
//     }
//   } catch (error) {
//     console.log(error, "an error occured in getListings()");
//   }
// }

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
      `${baseURL}/auction/profiles/${name}/listings?${tagQuery}${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&_active=true&offset=${offset}${limitQuery}`,
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
  // `${baseURL}/auction/profiles/${name}/listings?${tagQuery}${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&_active=true&offset=${offset}${limitQuery}`
}

export async function getAllProfiles() {
  const locStor = getLocalStorage();
  try {
    const res = await fetch(`${baseURL}/auction/profiles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${locStor.token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error, "an error occured in getAllProfiles()");
  }
}
export async function getSingleProfile(name) {
  const locStor = getLocalStorage();
  try {
    const res = await fetch(`${baseURL}/auction/profiles/${name}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${locStor.token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error, "an error occured in getSingleProfile()");
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

/** `${baseURL}/auction/listings?${tagQuery}${sortQuery}${sortOrderQuery}&_seller=true&_bids=true&offset=${offset}${limitQuery}` */

// export async function getListingsUnathorized() {
// limit,
// offset = 0,
// sort,
// sortOrder,
// tag
// const locStor = getLocalStorage();
// const limitQuery = setFetchLimitURL(limit);
// const sortQuery = setSortQuery(sort);
// const sortOrderQuery = setSortOrderQuery(sortOrder);
// const tagQuery = setTagQuery(tag);
//   try {
//     const res = await fetch(`${baseURL}/auction/listings`);
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data);
//       return data;
//     }
//   } catch (error) {
//     console.log(error, "an error occured in getListings()");
//   }
// }
