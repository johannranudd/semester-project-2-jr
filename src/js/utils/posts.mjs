import { getLocalStorage } from "./storage.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export async function postListing(submitObject) {
  const locStor = getLocalStorage();
  try {
    const res = await fetch(`${baseURL}/auction/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${locStor.token}`,
      },
      body: JSON.stringify(submitObject),
    });
    if (res.ok) {
      window.location = "/listings.html";
    } else {
      return await res.json();
    }
  } catch (error) {
    throw new Error(error.toString());
  }
}

export async function bidOnEntry(requestObj, id) {
  const locStor = getLocalStorage();
  try {
    const res = await fetch(`${baseURL}/auction/listings/${id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${locStor.token}`,
      },
      body: JSON.stringify(requestObj),
    });
    if (res.ok) {
      window.location.reload();
    }
    return res.json();
  } catch (error) {
    throw new Error(error.toString());
  }
}
