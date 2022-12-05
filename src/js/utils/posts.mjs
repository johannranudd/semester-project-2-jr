import { getLocalStorage } from "./storage.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export async function postListing(submitObject) {
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

export async function bidOnEntry(requestObj, id) {
  console.log(requestObj);
  console.log(JSON.stringify(requestObj));
  console.log(id);
  const locStor = getLocalStorage();
  try {
    const req = await fetch(`${baseURL}/auction/listings/${id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${locStor.token}`,
      },
      body: JSON.stringify(requestObj),
    });
    if (req.ok) {
      console.log(req);
      const data = await req.json();
      console.log(data);
      return data;
    } else {
      console.log(req);
      console.log("req not OK");
    }
  } catch (error) {
    throw new Error(error.toString());
  }
}
