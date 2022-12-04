import { getLocalStorage } from "./storage.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export async function updateEntry(id, submitObject) {
  const locStor = getLocalStorage();
  try {
    const req = await fetch(`${baseURL}/auction/listings/${id}`, {
      method: "PUT",
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
