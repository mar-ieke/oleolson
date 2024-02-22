import firebase from "firebase/compat/app"; // Import the Firebase SDK
import "firebase/compat/database"; // Import the Realtime Database service

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrsuJ5CE-JKPWIJ87X7sHb-IElJf6x-qI",
  authDomain: "exitgame-ef689.firebaseapp.com",
  databaseURL:
    "https://exitgame-ef689-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "exitgame-ef689",
  storageBucket: "exitgame-ef689.appspot.com",
  messagingSenderId: "678409964473",
  appId: "1:678409964473:web:4595f0853f6ed48ea9c468",
  measurementId: "G-WYD2BKKCQL",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export { database };
