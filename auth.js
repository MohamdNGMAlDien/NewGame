// auth.js
import { app } from "./firebase-init.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.loginWithGoogle = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("مرحبًا: " + result.user.displayName);
      window.location.href = "game.html";
    })
    .catch((error) => alert(error.message));
};

window.loginAsGuest = function () {
  signInAnonymously(auth)
    .then(() => {
      alert("تم الدخول كضيف");
      window.location.href = "game.html";
    })
    .catch((error) => alert(error.message));
};

