import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { AiOutlineDelete } from "react-icons/ai";

const PlanWorkout = () => {
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({
    muscle: "chest",
    exercise: "",
  });
  const { muscle, exercise } = selectedExercise;
  const [loading, setLoading] = useState();

  ////////// ONCLICK MUSCLE //////////

  const onClickMuscle = (event) => {
    event.preventDefault();
    setSelectedExercise((prev) => {
      return { ...prev, muscle: event.target.id };
    });
  };

  ////////// ONCLICK EXERCISE //////////

  const onClickExercise = (event) => {
    event.preventDefault();
    // console.log("event.target.value =", event.target.value);
    setSelectedExercise((prev) => {
      return { ...prev, exercise: event.target.value };
    });
  };

  //   console.log("selected exercise =", selectedExercise);

  ////////// ONCLICK ADD EXERCISE //////////

  const onClickAddExercise = (event) => {
    event.preventDefault();
    setWorkoutPlan((prev) => {
      return [...prev, selectedExercise];
    });
  };

  console.log("workout plan =", workoutPlan);

  ////////// ONCLICK DELETE WORKOUT PLAN //////////

  const onDeleteWorkoutPlan = (targetIndex) => {
    const updatedWorkoutPlan = workoutPlan.filter((exercise, index) => {
      if (index !== targetIndex) {
        return exercise;
      }
      return false;
    });

    setWorkoutPlan(updatedWorkoutPlan);
  };

  ////////// FETCH EXERCISES ACCORDING TO TARGET MUSCLE //////////

  const fetchExercises = async (muscle) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "exercise"),
        where("muscle", "==", muscle)
      );
      const querySnapshot = await getDocs(q);
      const exercises = [];
      querySnapshot.forEach((doc) => {
        exercises.push({ id: doc.id, data: doc.data() });
      });
      setExerciseOptions(exercises);
      setLoading(false);
      //   console.log("exercises options=", exercises);
    } catch (error) {
      //   console.log(`!!! fetching ${muscle} error =`, error);
    }
  };

  useEffect(() => {
    fetchExercises(selectedExercise.muscle);
  }, [selectedExercise.muscle]);

  //////////

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div className="max-w-xs mx-auto">
      <p className="text-2xl font-bold text-center mt-6">Track Your Workout</p>
      <p className="text-center font-normal">Let's plan your workout!</p>
      <form className="mt-6">
        {/* TARGET MUSCLE */}
        <p className="mb-2 font-medium">Target muscle</p>
        <div className="grid grid-cols-3">
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

        {/* EXERCISE OPTIONS */}
        <p className="mt-3 mb-2 font-medium">
          Exercises for <span className="font-bold">{muscle}</span> muscle
        </p>
        <div className="flex flex-col">
          {exerciseOptions.length === 0 ? (
            <span className="text-gray-500">
              No exercise. Create new exercise{" "}
              <a
                className="underline hover:text-gray-700"
                href="/create-exercise"
              >
                here
              </a>
              .
            </span>
          ) : (
            <div className="grid grid-cols-2">
              {exerciseOptions.map((exercise) => {
                return (
                  <button
                    className={`m-1 capitalize text-base text-white font-medium rounded-md px-3 py-1 hover:bg-[#a0b2c2] ${
                      selectedExercise.exercise === exercise.data.name
                        ? "bg-[#a0b2c2]"
                        : "bg-[#d2d8df]"
                    }`}
                    key={exercise.id}
                    value={exercise.data.name}
                    onClick={onClickExercise}
                  >
                    {exercise.data.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ADD EXERCISE BUTTON */}
        <button
          className="w-full mt-3 text-white font-semibold bg-[#31455e] px-4 py-2 rounded-md shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
          onClick={onClickAddExercise}
        >
          Add Exercise
        </button>

        {/* WORKOUT PLAN */}
        <p className="mt-6 mb-2 text-center font-semibold">Your workout plan</p>
        {workoutPlan.map((exercise, index) => {
          return (
            <div className="flex items-center" key={index}>
              <p className="capitalize">
                <span>{index + 1}</span>. {exercise.muscle} :{" "}
                {exercise.exercise}
              </p>

              <AiOutlineDelete
                className="ml-2 cursor-pointer hover:text-red-700"
                onClick={() => {
                  onDeleteWorkoutPlan(index);
                }}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default PlanWorkout;
