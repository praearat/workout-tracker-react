import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = input;
  const navigate = useNavigate();

  ////////// ONCHANGE INPUT //////////

  const onChangeInput = (event) => {
    setInput((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  ////////// ONCLICK SIGN UP //////////

  const onClickSignUp = async (event) => {
    event.preventDefault();
    try {
      // Create user and update display name in auth
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      console.log("user =", user.user);

      // Store user data on Firestore
      delete input.password;
      await setDoc(doc(db, "users", user.user.uid), {
        ...input,
        timestamp: serverTimestamp(),
      });

      toast.success("Sign up was successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("sign up & addDoc error =", error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center mt-6 max-w-xs mx-auto space-y-3">
      <img
        className="w-[80%] mx-auto"
        src={process.env.PUBLIC_URL + "../barbell-01.png"}
        alt=""
      />
      <form className="w-full mx-auto space-y-3" onSubmit={onClickSignUp}>
        <input
          className="w-full border rounded-md px-5 py-2"
          type="text"
          id="name"
          placeholder="Name"
          required
          onChange={onChangeInput}
        />
        <input
          className="w-full border rounded-md px-5 py-2"
          type="email"
          id="email"
          placeholder="Email"
          required
          onChange={onChangeInput}
        />
        <input
          className="w-full border rounded-md px-5 py-2"
          type="password"
          id="password"
          placeholder="Password"
          required
          onChange={onChangeInput}
        />
        <div className="flex justify-between">
          <p className="text-sm">
            Have an account?{" "}
            <Link className="text-red-600 hover:text-red-700" to="/sign-in">
              Sign in
            </Link>
          </p>
          <Link
            className="text-sm text-blue-600 hover:text-blue-700"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <button
          className="w-full border rounded-md px-4 py-2 bg-[#31455e] text-white text-sm font-bold hover:bg-[#29384c] focus:bg-[#1f2a39]"
          type="submit"
        >
          SIGN UP
        </button>
      </form>
      <div className="flex items-center">
        <hr className="w-[50%] border-gray-300" />
        <p className="mx-2 text-sm font-medium">OR</p>
        <hr className="w-[50%] border-gray-300" />
      </div>
      <button className="flex justify-center w-full border rounded-md px-4 py-2 bg-red-700 hover:bg-red-800 focus:bg-red-900">
        <FcGoogle className="bg-white rounded-full text-lg mr-2" />
        <p className="text-white text-sm font-bold">CONTINUE WITH GOOGLE</p>
      </button>
    </div>
  );
};

export default SignUp;
