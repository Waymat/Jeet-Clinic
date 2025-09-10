import React, { useEffect, useState } from "react";
import { auth } from "../src/Components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Prescription from "./Components/Prescription";
import Login from "./Components/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Prescription />
          <button className="btn btn-secondary d-print-none" onClick={() => signOut(auth)}>
            Logout
          </button>
        </>
      ) : (
        <Login onLogin={() => console.log("Logged in")} />
      )}
    </div>
  );
}

export default App;
