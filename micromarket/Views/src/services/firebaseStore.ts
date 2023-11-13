import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_Qi7wv_ByT4z9eTgS_jmKYlCVwMA3SBI",
  authDomain: "micromarket-35ab5.firebaseapp.com",
  projectId: "micromarket-35ab5",
  storageBucket: "micromarket-35ab5.appspot.com",
  messagingSenderId: "1049001907893",
  appId: "1:1049001907893:web:687fc99e1eed09032c10fc",
  measurementId: "G-24MS8N2BSJ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
