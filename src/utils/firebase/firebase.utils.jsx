import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore, 
  doc, 
  getDoc,
  setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZdSj-2tiozw7-haTvfbDBId__O7CKML0",
    authDomain: "monarch-clothing-db-ec48e.firebaseapp.com",
    projectId: "monarch-clothing-db-ec48e",
    storageBucket: "monarch-clothing-db-ec48e.appspot.com",
    messagingSenderId: "553935269107",
    appId: "1:553935269107:web:06d23f597504432c245b86"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message)
      }
    }

    return userDocRef;
  } 