import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { BsCheckCircle } from "react-icons/bs";

const TrackingList = () => {
  const params = useParams();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //   console.log("params.trackingId =", params.trackingId);
  console.log("trackingData =", trackingData);

  ////////// FORMAT TIME //////////

  const formatTime = () => {
    const startTime = new Date(trackingData.startTime.toDate().toString());
    const formattedStartTime = startTime.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const finishTime = new Date(trackingData.finishTime.toDate().toString());
    const formattedFinishTime = finishTime.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const duration = finishTime - startTime;

    return {
      startTime: formattedStartTime,
      finishTime: formattedFinishTime,
      duration,
    };
  };

  ////////// ON SAVE WORKOUT PLAN //////////

  const onSavePlan = () => {
    navigate("/create-plan", { state: { trackingData } });
  };

  ////////// FETCH TRACKING DATA //////////

  useEffect(() => {
    const fetchTrackingData = async () => {
      const docRef = doc(db, "trackings", params.trackingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrackingData(docSnap.data());
        setLoading(false);
      } else {
        toast.error("No tracking data");
      }
    };
    fetchTrackingData();
  }, [params.trackingId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-[350px] mx-auto">
      <p className="text-center mt-6 mb-4 text-2xl font-bold">Tracking Data</p>
      <div className="grid grid-cols-4 items-end">
        <p className="text-sm font-medium uppercase">Start Time</p>
        <p className="ml-3 col-span-3">: {formatTime().startTime}</p>
        <p className="text-sm font-medium uppercase">Finish Time</p>
        <p className="ml-3 col-span-3">: {formatTime().finishTime}</p>
        <p className="text-sm font-medium uppercase">Duration</p>
        <p className="ml-3 col-span-3">
          : {(formatTime().duration / 1000 / 60).toFixed(2)} minutes
        </p>
      </div>

      <button
        className="w-full mt-6 text-sm text-[#87a0b2] font-semibold rounded-md bg-[#f0f0f0] border border-[#87a0b2] px-4 py-2 shadow-sm hover:text-[#648498] hover:border-[#648498] hover:shadow-md focus:bg-[#d1d9df] focus:shadow-lg"
        onClick={onSavePlan}
      >
        Save This Workout Plan
      </button>

      {trackingData.data.map((exercise, exerciseIndex) => {
        return (
          <div key={exerciseIndex}>
            {/* EXERCISE NAME */}
            <div className="flex items-start mt-6 font-bold">
              <BsCheckCircle className="mr-2 mt-[2px] text-xl cursor-pointer" />
              <p className="text-[#648498] capitalize">
                Exercise {exerciseIndex + 1} :
                <span className="ml-1">
                  {exercise.muscle} - {exercise.exercise}
                </span>
              </p>
            </div>

            {/* COL HEADER */}
            <div className="mt-2 grid grid-cols-7">
              <p className="text-xs font-semibold uppercase">Set</p>
              <p className="text-xs font-semibold uppercase col-span-2">
                Weight
                <span className="ml-1 font-normal">(kg)</span>
              </p>
              <p className="text-xs font-semibold uppercase col-span-2">Reps</p>
            </div>

            {/* SET TRACKING INPUT */}
            {trackingData.data[exerciseIndex].sets.map((set, setIndex) => {
              return (
                <div className="grid grid-cols-7" key={setIndex}>
                  <p className="mt-1 font-semibold">{setIndex + 1}</p>
                  <p className="mt-1 w-[70px] col-span-2">{set.weight}</p>
                  <p className="mt-1 w-[70px] col-span-2">{set.reps}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TrackingList;
