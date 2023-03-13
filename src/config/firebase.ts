// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect } from "react";
import { addDoc, collection, CollectionReference, doc, DocumentData, getDoc, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore";
import 'firebase/firestore';
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
export const storage = getStorage();
export const db = getFirestore(app);

interface UserObj {
  name: string;
  time: string;
}

export const submitUserTime = async (userObj: UserObj) => {
  try {
    const collectionRef = collection(db, "game", "leaderboard", "users");
    await addDoc(collectionRef, userObj);
  } catch(err) {
    console.error("Error in submitUserTime: ", err);
  }
}

interface UserStats {
  name: string;
  time: string;
}

export const getTopUsers = async(set: React.Dispatch<React.SetStateAction<UserStats[] | undefined>>) => {
  useEffect(() => {
    let canceled = false;

    const unsub = async () => {
      try {
        const collectionRef: CollectionReference<DocumentData> = collection(db, "game", "leaderboard", "users");
        const q = query(collectionRef, orderBy('time', 'asc'), limit(5));
        const querySnapshot = await getDocs(q);

        const topUsers: UserStats[] = [];

        querySnapshot.forEach((doc: DocumentData) => {
          const { name, time } = doc.data() as UserStats;
          topUsers.push({ name, time });
        });

        if (!canceled) {
          set(topUsers);
        }
      } catch (err) {
        console.error('Error in getTopUsers: ', err);
      }
    }

    unsub();

    return () => {
      canceled = true;
    };
  }, []);
}
