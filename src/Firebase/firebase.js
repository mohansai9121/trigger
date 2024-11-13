import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtJZ3fBOgCIEyl-Fc9BSg9KNJ_BOeWj-M",
  authDomain: "trigger-67285.firebaseapp.com",
  projectId: "trigger-67285",
  storageBucket: "trigger-67285.firebasestorage.app",
  messagingSenderId: "314428305796",
  appId: "1:314428305796:web:c39e11b9eca8b200d6add1",
  measurementId: "G-F6VX66SPL6",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(
  app,
  "https://trigger-67285-default-rtdb.asia-southeast1.firebasedatabase.app/"
);
export const auth = getAuth(app);
