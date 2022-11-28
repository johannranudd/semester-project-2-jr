import { setLocalStorage } from "../utils/storage.mjs";
const baseURL = "https://api.noroff.dev/api/v1";
const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#login-form");
const logingWarning = document.querySelector(".login-wanring");

const reg = {
  name: "testnjbr1", // Required
  email: "testnjbr1@stud.noroff.no", // Required
  password: "qwertyuiop", // Required
  avatar:
    "https://images.unsplash.com/photo-1661956602926-db6b25f75947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2198&q=80", // Optional
};

async function registerFn(loginDetails) {
  try {
    const res = await fetch(`${baseURL}/auction/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });
    if (res.ok) {
      const { email, password } = loginDetails;
      loginFn(email, password);
    } else {
      console.log("res NOT OK", res);
    }
  } catch (e) {
    console.log(e, "error happened in registerFn()");
  }
}

async function loginFn(email, password) {
  console.log("starting loginFn()");
  try {
    const res = await fetch(`${baseURL}/auction/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      const { accessToken, name, email, avatar, credits } = data;
      setLocalStorage(true, accessToken, name, email, avatar, credits);
      window.location.href = "../../../index.html";
    }
  } catch (e) {
    console.log(e, "error happened in loginFn()");
  }
}

// *registerForm
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInputValue = document.querySelector("#name").value;
    const emailInputValue = document.querySelector("#email").value;
    const passwordInputValue = document.querySelector("#password").value;
    const avatarInputValue = document.querySelector("#avatar").value;
    if (nameInputValue && emailInputValue && passwordInputValue.length >= 6) {
      if (
        emailInputValue.includes("@noroff.no") ||
        emailInputValue.includes("@stud.noroff.no")
      ) {
        console.log("does include, continue login");
        const registerDetails = {
          name: nameInputValue, // Required
          email: emailInputValue, // Required
          password: passwordInputValue, // Required
        };
        // avatar: avatarInputValue ? avatarInputValue : null, // Required
        if (avatarInputValue) {
          // const imageRegex =
          //   /^https?:\/\/.*\/.*\.(png|gif|avif|webp|jpeg|jpg)\??.*$/gim;
          // const isImageString = imageRegex.test(avatarInputValue);
          // console.log("1: ", isImageString);
          registerDetails.avatar = avatarInputValue;
        }
        console.log(registerDetails);
        registerFn(registerDetails);
      }
    } else {
      logingWarning.innerHTML =
        "Email must include @noroff.no or @stud.noroff.no and password must be at least 6 characters";
    }
  });
}

// *loginform
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    if (emailValue && passwordValue.length >= 6) {
      if (
        emailValue.includes("@noroff.no") ||
        emailValue.includes("@stud.noroff.no")
      ) {
        // success
        console.log("does include, continue login");
        loginFn(emailValue, passwordValue);
      } else {
        logingWarning.innerHTML =
          "Email must include @noroff.no or @stud.noroff.no and password must be at least 6 characters";
      }
    } else {
      logingWarning.innerHTML =
        "Email must include @noroff.no or @stud.noroff.no and password must be at least 6 characters";
    }
  });
}
