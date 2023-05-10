import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PlanWorkout = () => {
  const [plan, setPlan] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({
    muscle: "chest",
    exercise: "",
    amountOfSets: "",
  });
  const { muscle, amountOfSets } = selectedExercise;
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

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

  ////////// ONCHANGE AMOUNT OF SETS //////////

  const onChangeSets = (event) => {
    setSelectedExercise((prev) => {
      return { ...prev, amountOfSets: event.target.value };
    });
  };

  // console.log("selected exercise =", selectedExercise);

  ////////// ONCLICK ADD EXERCISE //////////

  const onClickAddExercise = (event) => {
    event.preventDefault();

    if (!selectedExercise.exercise) {
      toast.error("Please select an exercise.");
      return;
    }

    setPlan((prev) => {
      return [...prev, selectedExercise];
    });
  };

  console.log("plan =", plan);

  ////////// ONCLICK DELETE PLAN //////////

  const onDeletePlan = (targetIndex) => {
    const updatedPlan = plan.filter((exercise, index) => {
      if (index !== targetIndex) {
        return exercise;
      }
      return false;
    });

    setPlan(updatedPlan);
  };

  ////////// ON START WORKOUT //////////

  const onStartTrackingWorkout = () => {
    //Prepare variable for collecting tracking id and data
    const trackingData = {
      id: null,
      data: [],
    };
    console.log("trackingData.startTime =", trackingData.startTime);

    //Create default tracking data structure from the plan
    trackingData.data = plan.map((exercise) => {
      const trackingSets = [];
      for (let i = 1; i <= exercise.amountOfSets; i++) {
        trackingSets.push({ weight: null, reps: null, status: false });
      }
      return {
        ...exercise,
        sets: trackingSets,
      };
    });

    //Add tracking doc to database and store its id to be used as a ref in track workout page
    const addTrackingDoc = async () => {
      const { id, ...data } = trackingData;
      console.log("trackingData =", trackingData);
      console.log("data =", data);
      try {
        const docRef = await addDoc(collection(db, "trackings"), {
          data,
          startTime: serverTimestamp(),
          finishTime: null,
        });
        trackingData.id = docRef.id;
        navigate("/track-workout", { state: { trackingData } });
      } catch (error) {
        console.log("!!!add tracking doc error =", error);
        toast.error("Something went wrong");
      }
    };
    addTrackingDoc();

    // console.log("trackingData =", trackingData);
    // console.log("plan =", plan);
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
      <p className="text-2xl font-bold text-center mt-6">Plan Your Workout</p>
      <p className="text-center font-normal">Let's plan your workout!</p>
      <form className="mt-6" type="submit" onSubmit={onClickAddExercise}>
        {/* TARGET MUSCLE */}
        <p className="mb-1 font-medium">1. Target muscle</p>
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
        <p className="mt-4 mb-1 font-medium">
          2. Exercises for <span className="font-bold">{muscle}</span> muscle
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

        {/* AMOUNT OF SETS */}
        <div className="flex items-center">
          <p className="mt-4 mb-2 font-medium">3. Amount of sets :</p>
          <input
            className="ml-2 rounded-md border border-gray-300 w-[70px] px-3 py-1 mt-2"
            type="number"
            value={amountOfSets}
            min={1}
            required
            onChange={onChangeSets}
          />
        </div>

        {/* ADD EXERCISE BUTTON */}
        <button
          className="flex justify-center items-center w-full mt-3 text-white font-semibold bg-[#31455e] px-4 py-2 rounded-md shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
          type="submit"
        >
          Add Exercise
          <IoMdAddCircle className="ml-2 text-xl" />
        </button>
      </form>

      {/* WORKOUT PLAN */}
      <div className="mt-6 bg-white rounded-xl px-5 py-4 shadow-md">
        <p className="mb-3 text-center font-semibold">Your workout plan</p>
        {plan.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Add exercise to your workout plan.
          </p>
        ) : (
          plan.map((exercise, index) => {
            return (
              <div className="flex justify-between items-start" key={index}>
                {/* {index > 0 && <hr className="border border-gray-300" />} */}
                {/* <TbPointFilled className="mr-1 text-sm" /> */}
                <p className="">
                  <span className="capitalize font-medium underline">
                    {exercise.muscle}
                  </span>
                  <span className="capitalize"> - {exercise.exercise}</span>
                </p>
                <div className="flex flex-wrap items-center ml-2 min-w-[80px]">
                  <p className="">({exercise.amountOfSets} sets)</p>
                  <AiOutlineDelete
                    className="ml-1 cursor-pointer hover:text-red-700"
                    onClick={() => {
                      onDeletePlan(index);
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
        <button
          className="flex items-center justify-center w-full mt-4 text-white font-semibold bg-[#31455e] px-4 py-2 rounded-md shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
          onClick={onStartTrackingWorkout}
        >
          Start Tracking Your Workout!
        </button>
      </div>
    </div>
  );
};

export default PlanWorkout;
