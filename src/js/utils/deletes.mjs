import { getLocalStorage } from "./storage.mjs";

const baseURL = "https://api.noroff.dev/api/v1";

export async function deleteEntry(id) {
  const locStor = getLocalStorage();
  try {
    const res = await fetch(`${baseURL}/auction/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${locStor.token}`,
      },
    });
    if (res.ok) {
      console.log(res);
      window.location = "/profile.html";
    }
  } catch (error) {
    console.log(error, "an error occured in deleteEntry()");
  }
}
