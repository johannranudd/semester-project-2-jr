/**
 * gets local storage
 * @returns {object} object, isLoggedIn, current state of localStorage
 */
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
  avatar
  //   profileDisplayed
) {
  localStorage.setItem(
    "isLoggedIn",
    JSON.stringify({
      isLoggedIn: isLoggedIn,
      token: token,
      name: name,
      email: email,
      avatar: avatar,
      //   profileDisplayed: profileDisplayed,
    })
  );
}
