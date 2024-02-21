import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { initializeApp } from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCrsuJ5CE-JKPWIJ87X7sHb-IElJf6x-qI",
  authDomain: "exitgame-ef689.firebaseapp.com",
  projectId: "exitgame-ef689",
  storageBucket: "exitgame-ef689.appspot.com",
  messagingSenderId: "678409964473",
  appId: "1:678409964473:web:4595f0853f6ed48ea9c468",
  measurementId: "G-WYD2BKKCQL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Access the database module from firebase
const db = getFirestore(app);
const usersRef = db.ref("activeUsers");

const App = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwords, setPasswords] = useState({ first: "test", second: "test" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    // Increment active user count
    const onConnect = usersRef.transaction(
      (currentUsers) => (currentUsers || 0) + 1
    );

    // Decrement on disconnect or unmount
    const onDisconnect = () => {
      usersRef.transaction((currentUsers) => (currentUsers || 1) - 1);
    };
    window.addEventListener("beforeunload", onDisconnect);

    return () => {
      onDisconnect();
      window.removeEventListener("beforeunload", onDisconnect);
    };
  }, []);

  const handleLogin = () => {
    if (password1 === passwords.first && password2 === passwords.second) {
      setIsLoggedIn(true);
      localStorage.setItem("lastLogin", Date.now());
    } else {
      alert("Falsches Passwort");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("lastLogin");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <p>
            Nicht schlecht, ihr Flachwasserpfeifen seid wahrlich clever! Doch
            wie steht es um den Teamspirit der Crew? Piratinnen, Piraten,
            Meerjungfrauen und Wassermänner, nur wo ihr getrennt seid, werdet
            ihr zusammen weiterkommen!{" "}
          </p>
          <br />
          <input
            type="password"
            placeholder="Erstes Passwort"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Zweites Passwort"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Abtauchen!</button>
        </div>
      ) : (
        <div>
          <p>{onlineUsers}</p>
          {onlineUsers >= 2 && <Confetti />}
          {onlineUsers >= 2 && <p>Luftballons können kaputt gehen... </p>}

          <button onClick={handleLogout}>Ausloggen</button>
        </div>
      )}
    </div>
  );
};

export default App;
