// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKL3CvKeOvVrT5gS3Kbmo12GnlDzRVaqs",
  authDomain: "ecommerce-69437.firebaseapp.com",
  projectId: "ecommerce-69437",
  storageBucket: "ecommerce-69437.appspot.com",
  messagingSenderId: "732779400553",
  appId: "1:732779400553:web:462a948e6e4fd1606101f8",
  measurementId: "G-PN8T9QBZXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);