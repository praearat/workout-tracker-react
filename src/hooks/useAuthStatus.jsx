import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        console.log("user =", user);
      } else {
        console.log("User is signed out");
      }
      setLoading(false);
    });
  }, []);
  return { loading, loggedIn };
};

export { useAuthStatus };
