import { auth, userSignUp } from "../firebase/firebase.js";
import { db } from "../firebase/firebase.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

let userEmail;
let userPass;
document.querySelector('.js-submit-button').addEventListener('click', async () => {
  userEmail = document.querySelector('.js-email-input').value;
  userPass = document.querySelector('.js-password-input').value;
  console.log(userEmail);
  console.log(userPass);
  
  try {
    await setDoc(doc(db, "users", userEmail), {
      email: userEmail,
      password: userPass
    });
    alert("Signup successful!");
    window.open("/index.html", "_self");
  } catch(err) {
    alert("Signup unsuccessful !");
    console.log(err);
  }
})

