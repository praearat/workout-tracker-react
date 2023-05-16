import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const OAuth = () => {
  const navigate = useNavigate();

  const onClickGoogle = async () => {
    try {
      //Continue with gg pop-up
      const provider = new GoogleAuthProvider();
      //Fix 'pop up has no gg account' case
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("user", user);

      //Add user doc to Firebase
      //Check whether the gg acc is already existed in database
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("Sign in was successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("!!!oauth error =", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      className="flex justify-center w-full border rounded-md px-4 py-2 bg-red-700 hover:bg-red-800 focus:bg-red-900"
      onClick={onClickGoogle}
    >
      <FcGoogle className="bg-white rounded-full text-lg mr-2" />
      <p className="text-white text-sm font-bold">CONTINUE WITH GOOGLE</p>
    </button>
  );
};

export default OAuth;
