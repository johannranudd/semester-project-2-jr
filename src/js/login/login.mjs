import { setLocalStorage } from "../utils/storage.mjs";
const baseURL = "https://api.noroff.dev/api/v1";
const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#login-form");
const logingWarning = document.querySelector(".login-wanring");

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
      displayLoginWarning("Incorrect email or password");
    }
  } catch (e) {
    throw new Error(e, "error happened in registerFn()");
  }
}

async function loginFn(email, password) {
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
      window.location.href = "/";
    } else {
      displayLoginWarning("Incorrect email or password");
    }
  } catch (e) {
    throw new Error(e, "error happened in loginFn()");
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
        const registerDetails = {
          name: nameInputValue, // Required
          email: emailInputValue, // Required
          password: passwordInputValue, // Required
        };
        if (avatarInputValue) {
          registerDetails.avatar = avatarInputValue;
        }
        registerFn(registerDetails);
      } else {
        displayLoginWarning(
          "Email must include @noroff.no or @stud.noroff.no and password must be at least 8 characters"
        );
      }
    } else {
      displayLoginWarning(
        "Email must include @noroff.no or @stud.noroff.no and password must be at least 8 characters"
      );
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

    if (emailValue && passwordValue.length >= 8) {
      if (
        emailValue.includes("@noroff.no") ||
        emailValue.includes("@stud.noroff.no")
      ) {
        // success
        loginFn(emailValue, passwordValue);
      } else {
        displayLoginWarning(
          "Email must include @noroff.no or @stud.noroff.no and password must be at least 8 characters"
        );
      }
    } else {
      displayLoginWarning(
        "Email must include @noroff.no or @stud.noroff.no and password must be at least 8 characters"
      );
    }
  });
}

function displayLoginWarning(message) {
  logingWarning.style.color = "red";
  logingWarning.innerHTML = message;
}
