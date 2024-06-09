import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr2g-gQu2A7I7KYve3ltl0_Un-K33UnQA",
  authDomain: "crud-fire-react-9491f.firebaseapp.com",
  projectId: "crud-fire-react-9491f",
  storageBucket: "crud-fire-react-9491f.appspot.com",
  messagingSenderId: "705200233351",
  appId: "1:705200233351:web:f3d27d955fe7d6e943d122"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);