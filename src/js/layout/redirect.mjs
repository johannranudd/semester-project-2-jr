import { getLocalStorage } from "../utils/storage.mjs";
function redirect() {
  const locStor = getLocalStorage();
  if (!locStor) {
    window.location.href = "../../../login.html";
  }
}

window.addEventListener("load", redirect);
