import React from "react";
import spinner from "../assets/svg/spinner.svg";

const Spinner = () => {
  return (
    <div className="bg-black bg-opacity-50 flex justify-center items-center fixed right-0 left-0 top-0 bottom-0 z-50">
      <img className="w-[70px]" src={spinner} alt="loading" />
    </div>
  );
};

export default Spinner;
