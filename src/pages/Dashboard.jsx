import React from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  const onClickExistingExercise = () => {
    navigate("/existing-exercise");
  };

  const onClickCreateExercise = () => {
    navigate("/create-exercise");
  };

  const onClickTrackWorkout = () => {
    navigate("/plan-workout");
  };

  return (
    <div className="max-w-[350px] mx-auto">
      <p className="text-center mt-6 text-2xl font-bold">Dashboard</p>
      <div className="flex justify-between mt-6">
        <button
          className="text-sm text-[#87a0b2] font-semibold rounded-md bg-[#f0f0f0] border border-[#87a0b2] px-4 py-2 shadow-sm hover:text-[#648498] hover:border-[#648498] hover:shadow-md focus:bg-[#d1d9df] focus:shadow-lg"
          onClick={onClickExistingExercise}
        >
          Existing Exercise
        </button>
        <button
          className="text-sm text-[#87a0b2] font-semibold rounded-md bg-[#f0f0f0] border border-[#87a0b2] px-4 py-2 shadow-sm hover:text-[#648498] hover:border-[#648498] hover:shadow-md focus:bg-[#d1d9df] focus:shadow-lg"
          onClick={onClickCreateExercise}
        >
          Create New Exercise
        </button>
      </div>
      <button
        className="mt-3 w-full text-sm text-white font-semibold rounded-md bg-[#31455e] px-4 py-2 shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
        onClick={onClickTrackWorkout}
      >
        Start Tracking Your Workout
      </button>
    </div>
  );
};

export default Dashboard;
