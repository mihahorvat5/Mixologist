import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAoUDzmnGcHA5PkmczirYrhFzZxKouFUkM",
    authDomain: "mixologist-3a824.firebaseapp.com",
    projectId: "mixologist-3a824",
    storageBucket: "mixologist-3a824.appspot.com",
    messagingSenderId: "7568472226",
    appId: "1:7568472226:web:8f7f4b86d2c223ce6f7ffb"
  
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };