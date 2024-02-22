import React, { useState } from "react";
import Confetti from "react-confetti";
import UserCount from "./components/UserCount";

const App = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwords, setPasswords] = useState({ first: "test", second: "test" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <UserCount isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Confetti />
          <p>Luftballons können kaputt gehen... </p>

          <button onClick={handleLogout}>Ausloggen</button>
        </div>
      )}
    </div>
  );
};

export default App;
