import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const SignIn = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const { email, password } = input;
  const navigate = useNavigate();

  ////////// ONCHANGE INPUT //////////

  const onChangeInput = (event) => {
    setInput((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  ////////// ONCLICK SIGN IN //////////

  const onClickSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      //   console.log("user.user =", user.user);
      toast.success("Sign in was successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("!!!sign in error =", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-6 max-w-xs mx-auto space-y-3">
      <img
        className="w-[80%] mx-auto"
        src={process.env.PUBLIC_URL + "../barbell-01.png"}
        alt=""
      />
      <form className="w-full mx-auto space-y-3" onSubmit={onClickSignIn}>
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
            Don't have an account?{" "}
            <Link className="text-red-600 hover:text-red-700" to="/sign-up">
              Register
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
          SIGN IN
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

export default SignIn;
