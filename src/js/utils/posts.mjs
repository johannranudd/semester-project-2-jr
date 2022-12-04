import { getLocalStorage } from "./storage.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export async function postListing(submitObject) {
  console.log(submitObject);
  const locStor = getLocalStorage();
  try {
    const req = await fetch(`${baseURL}/auction/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${locStor.token}`,
      },
      body: JSON.stringify(submitObject),
    });
    if (req.ok) {
      // const data = req.json();
      // return data;
      window.location = "/listings.html";
    } else {
      console.log("req not OK");
    }
  } catch (error) {
    throw new Error(error.toString());
  }
}

// 3d486168-1380-41e0-b552-66e3fd038a22
