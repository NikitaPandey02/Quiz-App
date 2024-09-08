import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3maEtg8wiYE1b4OIAJ83_Mhh7yB3DYbc",
  authDomain: "quiz-app-fb806.firebaseapp.com",
  projectId: "quiz-app-fb806",
  storageBucket: "quiz-app-fb806.appspot.com",
  messagingSenderId: "949511494155",
  appId: "1:949511494155:web:3405a70b395be3610dc50e",
  measurementId: "G-KSZ3FT8FSY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  

const db = getFirestore(app);

export { db };  
