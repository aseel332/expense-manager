import { auth, userLogIn } from "../firebase/firebase.js";
import { db } from "../firebase/firebase.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

if(localStorage.getItem("EXPENSE TRACKER USER")) {
  window.open("/home.html", "_self");
}

let userEmail;
let userPass;
// let isLoggingIn = false; // Flag to track active login attempts
// let isInitialCheck = true; // Flag for the first auth state check

async function onLogin() {
  userEmail = document.querySelector('.js-email-input').value;
  userPass = document.querySelector('.js-password-input').value;

  console.log("Attempting login with email:", userEmail);

  try {
    const docRef = await getDoc(doc(db, "users", userEmail));
    const userData = docRef.data();
    if(userData.password==userPass) {
      localStorage.setItem("EXPENSE TRACKER USER", JSON.stringify(userData));
      window.open("/home.html", "_self");
    } else {
      alert("Incorrect password!");
    }
  } catch(err){
    alert("Bro sign up");
  }
}

// Attach event listeners for login
document.querySelector('.js-submit-button').addEventListener('click', onLogin);

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    onLogin();
  }
});