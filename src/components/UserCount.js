// src/components/UserCount.js
import React, { useEffect, useState } from "react";

import { database } from "../firebase"; // Assuming firebaseConfig.js exports your Firebase instance initialized

const UserCount = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Unique key for each user session
    const userStatusRef = database.ref(
      "onlineUsers/" + database.ref("onlineUsers").push().key
    );

    // Set user online when component mounts
    userStatusRef.set(true).then(() => console.log("User added"));

    // Listen for number of online users
    const onlineUsersRef = database.ref("onlineUsers");
    onlineUsersRef.on("value", (snapshot) => {
      setUserCount(snapshot.numChildren());
    });

    // Remove user when they leave (component unmounts or browser closes)
    userStatusRef
      .onDisconnect()
      .remove()
      .then(() => console.log("User removed"));

    return () => {
      userStatusRef.remove(); // Also remove user when component unmounts gracefully
      onlineUsersRef.off(); // Detach the listener
    };
  }, []);

  return <div>Online Users: {userCount}</div>;
};

export default UserCount;
