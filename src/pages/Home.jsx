import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

const Home = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = input;
  const navigate = useNavigate();

  const onChangeInput = (event) => {
    setInput((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      console.log("user =", user.user);
      navigate("/dashboard");
    } catch (error) {
      console.log("sign up error =", error.message);
    }
  };

  console.log(input);
  return (
    <div className="flex flex-col justify-center mt-16 max-w-xs mx-auto space-y-6">
      <img
        className=""
        src={process.env.PUBLIC_URL + "../barbell-01.png"}
        alt=""
      />
      <form className="max-w-md mx-auto space-y-3" onSubmit={onSignUp}>
        <input
          className="w-full border rounded-md px-5 py-2"
          type="text"
          id="name"
          placeholder="Name"
          onChange={onChangeInput}
        />
        <input
          className="w-full border rounded-md px-5 py-2"
          type="email"
          id="email"
          placeholder="Email"
          onChange={onChangeInput}
        />
        <input
          className="w-full border rounded-md px-5 py-2"
          type="password"
          id="password"
          placeholder="Password"
          onChange={onChangeInput}
        />
        <button
          className="w-full border rounded-md px-4 py-2 bg-[#31455e] text-white font-semibold hover:bg-[#29384c] focus:bg-[#1f2a39]"
          type="submit"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Home;
