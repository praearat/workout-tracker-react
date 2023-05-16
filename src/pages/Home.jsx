import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";

const Home = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuthStatus();
  ////////// ONCLICK SIGN IN //////////

  const onClickSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-col justify-center mt-6 max-w-xs mx-auto space-y-3">
      <img
        className="w-[80%] mx-auto"
        src={process.env.PUBLIC_URL + "../logo.png"}
        alt=""
      />
      <ul className="">
        <li className="items-start grid grid-cols-10 mt-2">
          <BsCheckCircleFill className="mt-1 mr-2 text-xl text-green-600" />
          <p className="col-span-9 text-lg font-semibold">
            Create your own exercises
          </p>
        </li>
        <li className="items-start grid grid-cols-10 mt-2">
          <BsCheckCircleFill className="mt-1 mr-2 text-xl text-green-600" />
          <p className="col-span-9 text-lg font-semibold">
            Save your own workout plans
          </p>
        </li>
        <li className="items-start grid grid-cols-10 mt-2">
          <BsCheckCircleFill className="mt-1 mr-2 text-xl text-green-600" />
          <p className="col-span-9 text-lg font-semibold">
            Track your workout including set, weight, reps, and time
          </p>
        </li>
        <img
          className="w-[50%] mx-auto mt-3"
          src={process.env.PUBLIC_URL + "../exercise.png"}
          alt=""
        />
        {loggedIn ? (
          <></>
        ) : (
          <button
            className="mt-3 w-full border rounded-md px-4 py-2 bg-[#31455e] text-white text-sm font-bold shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
            onClick={onClickSignIn}
          >
            Sign in to create your own data!
          </button>
        )}
      </ul>
    </div>
  );
};

export default Home;
