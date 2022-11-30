const baseURL = "https://api.noroff.dev/api/v1";

export async function postListing(submitObject) {
  try {
    const res = await fetch(`${baseURL}/auction/listings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitObject),
    });
    if (res.ok) {
      console.log(res);
    } else {
      console.log("res not OK");
    }
  } catch (error) {
    throw new Error(error.toString());
  }
}
