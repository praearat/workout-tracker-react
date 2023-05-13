import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import ExerciseList from "../components/ExerciseList";
import { useNavigate } from "react-router";

const ExistingExercise = () => {
  const [existingExercises, setExistingExercises] = useState({
    chest: [],
    back: [],
    arms: [],
    abs: [],
    legs: [],
    shoulders: [],
  });
  const { chest, back, arms, abs, legs, shoulders } = existingExercises;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  ////////// ONCLICK CREATE NEW EXERCISE //////////
  const onClickCreateExercise = () => {
    navigate("/create-exercise");
  };

  ////////// ONCLICK DELETE EXERCISE //////////
  const onDelete = async (id, data) => {
    await deleteDoc(doc(db, "exercises", id));
    fetchExercises(data.muscle);
  };

  ////////// FETCH EXERCISES ACCORDING TO EACH MUSCLE //////////
  const fetchExercises = async (muscle) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "exercises"),
        where("userRef", "==", auth.currentUser.uid),
        where("muscle", "==", muscle)
      );
      const querySnapshot = await getDocs(q);
      const exercises = [];
      querySnapshot.forEach((doc) => {
        exercises.push({ id: doc.id, data: doc.data() });
      });
      console.log(muscle, "exercises =", exercises);
      setExistingExercises((prev) => {
        return { ...prev, [muscle]: exercises };
      });
      setLoading(false);
    } catch (error) {
      console.log(`fetching ${muscle} error =`, error);
    }
  };

  useEffect(() => {
    fetchExercises("chest");
    fetchExercises("back");
    fetchExercises("arms");
    fetchExercises("abs");
    fetchExercises("legs");
    fetchExercises("shoulders");
  }, []);

  console.log("all existing exercises =", existingExercises);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xs mx-auto">
      <p className="mt-6 text-center text-2xl font-bold">Existing Exercise</p>
      <p className="mt-6 font-bold text-[#648498] uppercase">Chest</p>
      <ExerciseList muscle={chest} onDelete={onDelete} />
      <p className="mt-6 font-bold text-[#648498] uppercase">Back</p>
      <ExerciseList muscle={back} onDelete={onDelete} />
      <p className="mt-6 font-bold text-[#648498] uppercase">Arms</p>
      <ExerciseList muscle={arms} onDelete={onDelete} />
      <p className="mt-6 font-bold text-[#648498] uppercase">Abs</p>
      <ExerciseList muscle={abs} onDelete={onDelete} />
      <p className="mt-6 font-bold text-[#648498] uppercase">Legs</p>
      <ExerciseList muscle={legs} onDelete={onDelete} />
      <p className="mt-6 font-bold text-[#648498] uppercase">Shoulders</p>
      <ExerciseList muscle={shoulders} onDelete={onDelete} />
      <button
        className="mt-6 w-full text-sm text-white font-semibold rounded-md bg-[#31455e] px-4 py-2 shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
        onClick={onClickCreateExercise}
      >
        Create New Exercise
      </button>
    </div>
  );
};

export default ExistingExercise;
