// import { getLocalStorage } from "../utils/storage.mjs";
// export function checkIfLoggedIn() {
//   const locStorage = getLocalStorage();
//   if (!window.location.href.includes("/login.html")) {
//     if (window.location.href.includes("/register.html")) {
//       return;
//     } else if (!locStorage || !locStorage.isLoggedIn) {
//       // window.location.href = "../../../login.html";
//     } else {
//       console.log(`you are already logged in as ${locStorage.name}`);
//     }
//   }
// }
// window.addEventListener("load", checkIfLoggedIn);
import { getLocalStorage } from "../utils/storage.mjs";
function redirect() {
  const locStor = getLocalStorage();
  if (!locStor) {
    window.location.href = "../../../login.html";
  }
}

window.addEventListener("load", redirect);
