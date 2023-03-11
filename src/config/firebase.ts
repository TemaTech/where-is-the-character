// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuDwgQ3HpmZqfMGQ7iHetDXj44Sa1LKhM",
  authDomain: "where-is-the-character.firebaseapp.com",
  projectId: "where-is-the-character",
  storageBucket: "where-is-the-character.appspot.com",
  messagingSenderId: "290563040097",
  appId: "1:290563040097:web:2d6b62eda41241238f5b20",
  measurementId: "G-6LBK7BTPDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

export const downloadBG = (set: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  useEffect(() => {
    const unsub = () => {
      try {
        const bgRef = ref(storage, "gs://where-is-the-character.appspot.com/bg.jpg");
        getDownloadURL(bgRef)
          .then((url) => {
            set(url);
          });
      } catch(err) {
        console.error("Error in downloadBG: ", err);
      }
    }
    return () => unsub();
  }, []);
}
