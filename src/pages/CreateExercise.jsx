import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateExercise = () => {
  const [exerciseDetails, setExerciseDetails] = useState({
    name: "",
    muscle: "chest",
  });
  const { muscle } = exerciseDetails;
  const navigate = useNavigate();

  ////////// ONCHANGE EXERCISE NAME ///////////

  const onChangeName = (event) => {
    setExerciseDetails((prev) => {
      return { ...prev, name: event.target.value.toLowerCase() };
    });
  };

  ////////// ONSELECT MUSCLE //////////

  const onClickMuscle = (event) => {
    event.preventDefault();
    setExerciseDetails((prev) => {
      return { ...prev, muscle: event.target.id };
    });
  };
  console.log("workout details =", exerciseDetails);

  ////////// ONSUBMIT EXERCISE //////////

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User is not authenticated");
      }

      const docRef = await addDoc(collection(db, "exercises"), {
        ...exerciseDetails,
        userRef: currentUser.uid,
      });
      console.log("docRef.id =", docRef.id);
      navigate("/dashboard");
      toast.success("Your exercise was created!");
    } catch (error) {
      console.log("submit error =", error);
    }
  };

  console.log("auth.currentUser =", auth.currentUser);

  //////////

  return (
    <div className="max-w-xs mx-auto">
      <h1 className="text-center mt-6 text-2xl font-bold">Create Exercise</h1>
      <form className="mt-6 flex flex-col" onSubmit={onSubmit}>
        <p className="text-base font-medium">Exercise Name</p>
        <input
          className="mt-2 rounded-md border px-4 py-2"
          type="text"
          placeholder="Ex. Bench Press"
          required
          onChange={onChangeName}
        />
        <p className="mt-3 text-base font-medium">Target Muscle</p>
        <div className="mt-2 grid grid-cols-2">
          <button
            className={`m-1 text-base text-white font-medium rounded-md  px-3 py-1 hover:bg-[#a0b2c2] ${
              muscle === "chest" ? "bg-[#a0b2c2]" : "bg-[#d2d8df]"
            }`}
            id="chest"
            onClick={onClickMuscle}
          >
            Chest
          </button>
          <button
            className={`m-1 text-base text-white font-medium rounded-md  px-3 py-1 hover:bg-[#a0b2c2] ${
              muscle === "back" ? "bg-[#a0b2c2]" : "bg-[#d2d8df]"
            }`}
            id="back"
            onClick={onClickMuscle}
          >
            Back
          </button>
          <button
            className={`m-1 text-base text-white font-medium rounded-md  px-3 py-1 hover:bg-[#a0b2c2] ${
              muscle === "arms" ? "bg-[#a0b2c2]" : "bg-[#d2d8df]"
            }`}
            id="arms"
            onClick={onClickMuscle}
          >
            Arms
          </button>
          <button
            className={`m-1 text-base text-white font-medium rounded-md  px-3 py-1 hover:bg-[#a0b2c2] ${
              muscle === "abs" ? "bg-[#a0b2c2]" : "bg-[#d2d8df]"
            }`}
            id="abs"
            onClick={onClickMuscle}
          >
            Abs
          </button>
          <button
            className={`m-1 text-base text-white font-medium rounded-md  px-3 py-1 hover:bg-[#a0b2c2] ${
              muscle === "legs" ? "bg-[#a0b2c2]" : "bg-[#d2d8df]"
            }`}
            id="legs"
            onClick={onClickMuscle}
          >
            Legs
          </button>
          <button
            className={`m-1 text-base text-white font-medium rounded-md  px-3 py-1 hover:bg-[#a0b2c2] ${
              muscle === "shoulders" ? "bg-[#a0b2c2]" : "bg-[#d2d8df]"
            }`}
            id="shoulders"
            onClick={onClickMuscle}
          >
            Shoulders
          </button>
        </div>
        {/* <input
          className="mt-2 rounded-md border px-4 py-2"
          type="text"
          placeholder="Ex. Chest"
        /> */}
        <button
          className="mt-6 text-base text-white font-semibold rounded-md bg-[#31455e] px-4 py-2 shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateExercise;
