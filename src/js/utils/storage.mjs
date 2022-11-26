import { checkIfLoggedIn } from "../layout/redirect.mjs";

export function getLocalStorage() {
  const locStorage = localStorage.getItem("isLoggedIn")
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : null;
  return locStorage;
}

export function setLocalStorage(
  isLoggedIn,
  token,
  name,
  email,
  avatar,
  credits
) {
  localStorage.setItem(
    "isLoggedIn",
    JSON.stringify({
      isLoggedIn: isLoggedIn,
      token: token,
      name: name,
      email: email,
      avatar: avatar,
      credits: credits,
    })
  );
}

export function clearLocalStorage() {
  localStorage.clear();
  checkIfLoggedIn();
}
