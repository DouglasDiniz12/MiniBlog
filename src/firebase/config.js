
import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBUfWrqOi-Tu2rcPv1QQrRRrcRiTaz7uDU",
  authDomain: "miniblog-a8a0a.firebaseapp.com",
  projectId: "miniblog-a8a0a",
  storageBucket: "miniblog-a8a0a.appspot.com",
  messagingSenderId: "37352252119",
  appId: "1:37352252119:web:b1ec3eae08f0a7a88f4692"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db,app};


