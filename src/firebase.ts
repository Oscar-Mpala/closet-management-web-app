import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDweT2XdRtzjLe4Nxtbcvt2uXyRl6iiJqQ",
  authDomain: "closet-manager-app.firebaseapp.com",
  projectId: "closet-manager-app",
  storageBucket: "closet-manager-app.firebasestorage.app",
  messagingSenderId: "209718969985",
  appId: "1:209718969985:web:be1d470128aa4331ceaf80",
  measurementId: "G-1WK0W9JTHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firestore database instance
export const dbCloud = getFirestore(app);