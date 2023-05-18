import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserUid(user.uid);
        console.log("user =", user);
      } else {
        console.log("User is signed out");
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);
  return { loading, loggedIn, userUid };
};

export { useAuthStatus };
