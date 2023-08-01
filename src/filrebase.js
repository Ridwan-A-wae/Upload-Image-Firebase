// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_KEY,
  authDomain: "uploadingfile-56698.firebaseapp.com",
  projectId: "uploadingfile-56698",
  storageBucket: "uploadingfile-56698.appspot.com",
  messagingSenderId: "319747180825",
  appId: "1:319747180825:web:39cb55aeb101e35211dd88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)