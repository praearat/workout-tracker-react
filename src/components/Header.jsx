import React from "react";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickDashboard = () => {
    navigate("/dashboard");
  };

  const onClickProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full h-[50px] bg-white border-b border-gray-300 shadow">
      <div className="flex h-[100%] justify-between items-center max-w-[350px] mx-auto">
        <div className="w-[50px]">
          <img
            src={process.env.PUBLIC_URL + "../barbell-01.png"}
            alt="workout-tracker-logo"
          />
        </div>
        <div className="flex space-x-6 font-semibold">
          <p
            className={`${
              location.pathname === "/dashboard"
                ? "text-black border-b-4 border-[#a0b2c2]"
                : "text-gray-400"
            } cursor-pointer py-[10px]`}
            onClick={onClickDashboard}
          >
            Dashboard
          </p>
          <p
            className={`${
              location.pathname === "/profile"
                ? "text-black border-b-4 border-[#a0b2c2]"
                : "text-gray-400"
            } cursor-pointer py-[10px]`}
            onClick={onClickProfile}
          >
            Profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
