import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";

const PlanList = () => {
  const params = useParams();
  const [planData, setPlanData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log("planData =", planData);

  ////////// FETCH PLAN DATA //////////

  useEffect(() => {
    const fetchPlanData = async () => {
      const docRef = doc(db, "plans", params.planId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPlanData(docSnap.data());
      } else {
        console.log("!!!fetchPlanData error");
      }
      setLoading(false);
    };
    fetchPlanData();
  }, [params.planId]);

  ////////// ONSTART TRACKING WORKOUT //////////

  const onStartTrackingWorkout = () => {
    //Prepare variable for collecting tracking id, plan name, tracking data,
    //start time, finish time, and userRef
    const trackingData = {
      id: null,
      name: planData.name,
      data: [],
      startTime: serverTimestamp(),
      finishTime: null,
      userRef: auth.currentUser.uid,
    };
    console.log("trackingData.startTime =", trackingData.startTime);

    //Create default tracking data structure from the amount of sets
    trackingData.data = planData.data.map((exercise) => {
      const trackingSets = [];
      for (let i = 1; i <= exercise.amountOfSets; i++) {
        trackingSets.push({ weight: null, reps: null, status: false });
      }
      return {
        ...exercise,
        sets: trackingSets,
      };
    });

    //Add tracking doc to database(without id field)
    //then get its id from database to be used as a ref in the next page (track workout page)
    const addTrackingDoc = async () => {
      const { id, ...res } = trackingData;
      console.log("trackingData =", trackingData);
      console.log("res =", res);
      try {
        const docRef = await addDoc(collection(db, "trackings"), res);
        trackingData.id = docRef.id;
        navigate("/track-workout", { state: { trackingData } });
      } catch (error) {
        console.log("!!!add tracking doc error =", error);
        toast.error("Something went wrong");
      }
    };
    addTrackingDoc();
  };

  ////////// LOADING //////////

  if (loading) {
    return <></>;
  }

  return (
    <div className="max-w-[350px] mx-auto">
      <div className="mt-6 bg-white rounded-xl px-5 py-4 shadow-md">
        {planData ? (
          <p className="mb-3 text-center font-semibold capitalize">
            {planData.name}
          </p>
        ) : (
          <p className="text-gray-500">No document</p>
        )}

        {planData && (
          <div>
            {planData.data.map((exercise, index) => {
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
                  </div>
                </div>
              );
            })}
            <button
              className="flex items-center justify-center w-full mt-4 text-white font-semibold bg-[#31455e] px-4 py-2 rounded-md shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
              onClick={onStartTrackingWorkout}
            >
              Start Tracking Your Workout!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanList;
