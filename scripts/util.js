import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

console.log("hi");

require("dotenv").config();
console.log("p", process.env);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "eup-blockly.firebaseapp.com",
  projectId: "eup-blockly",
  storageBucket: "eup-blockly.appspot.com",
  messagingSenderId: "217753483766",
  appId: process.env.APP_ID,
  measurementId: "G-9CXK0MCT41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

console.log(window.location.href);
const url = new URL(window.location.href);
// console.log(url.searchParams.get('STUDY_ID'));

document.querySelector("#runButton").addEventListener("click", () => {
  if (document.getElementById("runButton").innerHTML == "Stop Program") {
    record();
  }
});

async function record() {
  try {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const docRef = await addDoc(collection(db, "task3"), {
      study_id: url.searchParams.get("STUDY_ID"),
      prolific_pid: url.searchParams.get("PROLIFIC_PID"),
      session_id: url.searchParams.get("SESSION_ID"),
      timestamp: today.toISOString(),
      code: document.getElementById("code").innerHTML,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
