import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn } = useAuthStatus();

  ////////// ONCLICK DASHBOARD //////////

  const onClickDashboard = () => {
    navigate("/dashboard");
  };

  ////////// ONCLICK SIGN IN //////////

  const onClickSignIn = () => {
    navigate("/sign-in");
  };

  ////////// ONCLICK PROFILE //////////

  const onClickProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full h-[60px] bg-white border-b border-gray-300 shadow">
      <div className="flex h-[100%] justify-between items-center max-w-[350px] mx-auto">
        <div className="w-[50px]">
          <img
            src={process.env.PUBLIC_URL + "../logo.png"}
            alt="workout-tracker-logo"
          />
        </div>
        <div className="flex space-x-6 font-semibold">
          <p
            className={`${
              location.pathname === "/dashboard"
                ? "text-black border-b-4 border-[#a0b2c2]"
                : "text-gray-400"
            } cursor-pointer py-[15px]`}
            onClick={onClickDashboard}
          >
            Dashboard
          </p>
          {loggedIn ? (
            <p
              className={`${
                location.pathname === "/profile"
                  ? "text-black border-b-4 border-[#a0b2c2]"
                  : "text-gray-400"
              } cursor-pointer py-[15px]`}
              onClick={onClickProfile}
            >
              Profile
            </p>
          ) : (
            <p
              className={`${
                location.pathname === "/sign-in"
                  ? "text-black border-b-4 border-[#a0b2c2]"
                  : "text-gray-400"
              } cursor-pointer py-[15px]`}
              onClick={onClickSignIn}
            >
              Sign In
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
