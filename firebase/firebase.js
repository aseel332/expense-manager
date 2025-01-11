
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"


const firebaseConfig = {
  apiKey: "AIzaSyCoYsmTRB2oUmrOWcRyWurVP-waniKuRdU",
  authDomain: "expense-manager-9b16e.firebaseapp.com",
  projectId: "expense-manager-9b16e",
  storageBucket: "expense-manager-9b16e.firebasestorage.app",
  messagingSenderId: "337679659260",
  appId: "1:337679659260:web:725c556dc2b80f6b1c6779",
  measurementId: "G-X3RDWMLLS1"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export function userSignUp(auth, email, password){
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   
    window.location.href = 'home.html';
    const user = userCredential.user;
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
  });
}

export async function userLogIn(auth, email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; 
  } catch (error) {
    alert(`Login failed: ${error.message}`);
    throw error; 
  }
}







export async function saveExpense(expenses) {
  
  const storedData = JSON.parse(localStorage.getItem("EXPENSE TRACKER USER"));
  const userEmail = storedData.email;

  if (!userEmail || typeof userEmail !== "string") {
    console.error("Invalid userEmail:", userEmail);
    throw new Error("User email is missing or invalid.");
  }

  
  if (!Array.isArray(expenses)) {
    console.error("Expenses is not an array:", expenses);
    throw new Error("Expenses should be an array.");
  }

 
  for (const expense of expenses) {
    if (!expense.expenseId || typeof expense.expenseId !== "string") {
      console.error("Invalid expenseId in expense:", expense);
      continue; 
    }

    try {
      await setDoc(doc(db, "users", userEmail, "expenses", expense.expenseId), {
        name: expense.name,
        category: expense.category,
        date: expense.date,
        time: expense.time,
        amount: expense.amount,
        timeline: expense.timeline,
        expenseId: expense.expenseId,
        class: expense.class,
      });
      console.log("Expense saved:", expense);
    } catch (error) {
      console.error("Error saving expense:", expense, error);
    }
  }
}

export async function addExpense(expense) {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    try {
      const docRef = doc(db, "expenses", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
       
        await updateDoc(docRef, {
          expenses: arrayUnion(expense),
        });
        console.log("Expense added to Firestore.");
      } else {
     
        await setDoc(docRef, {
          expenses: [expense],
        });
        console.log("New expense document created with the expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  } else {
    console.error("No user is logged in.");
  }
}

export async function deleteExpense(expenseId) {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    try {
      const docRef = doc(db, "expenses", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedExpenses = docSnap
          .data()
          .expenses.filter((expense) => expense.expenseId !== expenseId);

        await updateDoc(docRef, {
          expenses: updatedExpenses,
        });
        console.log("Expense deleted from Firestore.");
      } else {
        console.log("No expenses found for the user to delete.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  } else {
    console.error("No user is logged in.");
  }
}
