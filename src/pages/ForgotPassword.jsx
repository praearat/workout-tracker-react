import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  ////////// ONCHANGE INPUT //////////

  const onChangeInput = (event) => {
    setEmail(event.target.value);
  };

  ////////// ONCLICK SEND RESET EMAIL //////////

  const onClickSendEmail = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email sent!");
    } catch (error) {
      console.log("!!!sent email error =", error);
      toast.error("error.message");
    }
  };

  return (
    <div className="flex flex-col justify-center mt-6 max-w-xs mx-auto space-y-3">
      <img
        className="w-[80%] mx-auto"
        src={process.env.PUBLIC_URL + "../logo.png"}
        alt=""
      />
      <form className="w-full mx-auto space-y-3" onSubmit={onClickSendEmail}>
        <input
          className="w-full border rounded-md px-5 py-2"
          type="email"
          id="email"
          placeholder="Email"
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
            to="/sign-in"
          >
            Sign in instead
          </Link>
        </div>
        <button
          className="w-full border rounded-md px-4 py-2 bg-[#31455e] text-white text-sm font-bold hover:bg-[#29384c] focus:bg-[#1f2a39]"
          type="submit"
        >
          SEND RESET EMAIL
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

export default ForgotPassword;
