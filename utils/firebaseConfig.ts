import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv8qNMcS8kSW5J61OSw1L5r7jMcfsxSoI",
  authDomain: "englishapp-7189c.firebaseapp.com",
  databaseURL:
    "https://englishapp-7189c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "englishapp-7189c",
  storageBucket: "englishapp-7189c.appspot.com",
  messagingSenderId: "356235006010",
  appId: "1:356235006010:web:b6b46c6fce6054235d2503",
  measurementId: "G-KE8LDT2L9B",
};

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage };
