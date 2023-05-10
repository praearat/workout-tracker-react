import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { BsCheckCircle } from "react-icons/bs";

const TrackingList = () => {
  const params = useParams();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  //   console.log("params.trackingId =", params.trackingId);
  console.log("trackingData =", trackingData);

  const formatTime = () => {
    const startTime = new Date(trackingData.startTime.toDate().toString());
    const formattedStartTime = startTime.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const finishTime = new Date(trackingData.finishTime.toDate().toString());
    const formattedFinishTime = finishTime.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const duration = finishTime - startTime;

    return {
      startTime: formattedStartTime,
      finishTime: formattedFinishTime,
      duration,
    };
  };

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
      <div className="grid grid-cols-4">
        <p className="font-medium">Start Time</p>
        <p className="col-span-3">: {formatTime().startTime}</p>
        <p className="font-medium">Finish Time</p>
        <p className="col-span-3">: {formatTime().finishTime}</p>
        <p className="font-medium">Duration</p>
        <p className="col-span-3">
          : {(formatTime().duration / 1000 / 60).toFixed(2)} minutes
        </p>
      </div>

      {trackingData.data.map((exercise, exerciseIndex) => {
        return (
          <div key={exerciseIndex}>
            {/* EXERCISE NAME */}
            <div className="flex items-start mt-6 font-semibold">
              <BsCheckCircle className="mr-2 mt-[2px] text-xl cursor-pointer" />
              <p>
                Exercise {exerciseIndex + 1} :
                <span className="ml-1 font-normal capitalize">
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
                  <p className="mt-1 font-semibold uppercase">{setIndex + 1}</p>
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
