import { getLocalStorage } from "./storage.mjs";
const baseURL = "https://api.noroff.dev/api/v1";

export async function updateEntry(id, submitObject) {
  const locStor = getLocalStorage();
  try {
    const res = await fetch(`${baseURL}/auction/listings/${id}`, {
      method: "PUT",
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

export async function updateProfileAvatar(name, submitObject) {
  const locStor = getLocalStorage();
  try {
    const res = await fetch(`${baseURL}/auction/profiles/${name}/media`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${locStor.token}`,
      },
      body: JSON.stringify(submitObject),
    });
    // return res;
    return await res.json();
  } catch (error) {
    throw new Error(error.toString());
  }
}
