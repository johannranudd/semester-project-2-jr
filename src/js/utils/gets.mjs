// `${baseURL}/profiles/${userName}?_posts=true&_following=true&_followers=true${limitQuery}`;
import { getLocalStorage } from "../utils/storage.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export function setFetchLimitURL(limit) {
  if (!limit) {
    return "";
  } else {
    let limitQuery = `&limit=${limit}`;
    return limitQuery;
  }
}

export async function getListings() {
  const locStor = getLocalStorage();
  const limitQuery = setFetchLimitURL();
  try {
    const res = await fetch(
      `${baseURL}/auction/listings?_seller=true&_bids=true&${limitQuery}`,
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
