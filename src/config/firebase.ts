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
const storage = getStorage();
const db = getFirestore(app);

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

type DownloadCharacterAvatar = React.Dispatch<React.SetStateAction<string | undefined>>;

export const downloadCharacterAvatars = (set1: DownloadCharacterAvatar, set2: DownloadCharacterAvatar, set3: DownloadCharacterAvatar) => {
  useEffect(() => {
    const unsub = () => {
      try {
        // Luigi
        const avatar1Ref = ref(storage, "gs://where-is-the-character.appspot.com/dbluu19-00099188-0f27-44ed-aab2-db513c66ef20.png");
        getDownloadURL(avatar1Ref)
          .then((url) => {
            set1(url);
        });
        // Bob-omb
        const avatar2Ref = ref(storage, "gs://where-is-the-character.appspot.com/dfcopdq-3e38c893-e09a-4f34-aac6-6921ea81e2d3.png");
        getDownloadURL(avatar2Ref)
          .then((url) => {
            set2(url);
        });
        // Donkey Kong
        const avatar3Ref = ref(storage, "gs://where-is-the-character.appspot.com/54f2862be0933.png");
        getDownloadURL(avatar3Ref)
          .then((url) => {
            set3(url);
        });
      } catch(err) {
        console.error("Error in downloadCharacterAvatars: ", err);
      }
    }
    return () => unsub();
  }, []);
}

interface characterObj {
  xStart: string;
  xEnd: string;
  yStart: string;
  yEnd: string;
}

type SetCharCoordinates = React.Dispatch<React.SetStateAction<characterObj | undefined>>;

export const getCharactersData = (setLuigi: SetCharCoordinates, setBobomb: SetCharCoordinates, setDonkeyKong: SetCharCoordinates) => {
  useEffect(() => {
    const unsub = () => {
      try {
        const docRef = doc(db, "game", "characters");
        getDoc(docRef)
          .then((doc) => {
            setLuigi(doc.data()?.["Luigi"]);
            setBobomb(doc.data()?.["Bob-omb"]);
            setDonkeyKong(doc.data()?.["Donkey Kong"]);
          });
      } catch(err) {
        console.error("Error in getCharacterData: ", err);
      }
    }
    return () => unsub();
  }, []);
}

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
