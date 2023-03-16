import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpRg1A1ICS5qcpzXjKAfxOBJwstYWcj3o",
  authDomain: "shopsystem-1ef19.firebaseapp.com",
  projectId: "shopsystem-1ef19",
  storageBucket: "shopsystem-1ef19.appspot.com",
  messagingSenderId: "691215778844",
  appId: "1:691215778844:web:3c5f4b14c62fede13f4bd9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  console.log(userAuth);
  const userDocRef = doc(db, "users", userAuth.user.uid);
  console.log(userDocRef);

  //database, document name, reference
  const userSnapshot = await getDoc(userDocRef);

  //if user data does not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth.user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  //if user data exists

  //return user id
};
