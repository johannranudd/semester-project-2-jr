// import { checkIfLoggedIn } from "../layout/redirect.mjs";

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
  window.location.href = "../../../login.html";
}

//
//
// SESSION
//
//

export function getSessionStorage(key) {
  const sesStor = sessionStorage.getItem(key)
    ? JSON.parse(sessionStorage.getItem(key))
    : [];
  return sesStor;
}

export function setSessionStorage(key, array) {
  sessionStorage.setItem(key, JSON.stringify(array));
}

// const sessStor = getSessionStorage();
// setSessionStorage(`userCashe-${locStor.name}`, {
//   name: locStor.name,
//   avatar: locStor.avatar,
// });
//  listElem.forEach((elem) => {
//    const header = elem.querySelector("h5");
//    const image = elem.querySelector("img");
//    const sStorage = getSessionStorage(`userCashe-${header.textContent}`);

//    if (header.textContent === sStorage.name) {
//      image.src = sStorage.avatar && sStorage.avatar;
//      image.addEventListener("error", () => {
//        image.src = "../../../assets/images/profile-img.png";
//      });
//      image.alt = `profile image of ${sStorage.name}`;
//      image.classList.add(
//        "w-12",
//        "h-12",
//        "object-cover",
//        "rounded-full",
//        "border-solid",
//        "border-2",
//        "border-primaryClr"
//      );
//    }
//  });
