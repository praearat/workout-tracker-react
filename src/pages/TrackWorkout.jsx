import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const TrackWorkout = () => {
  const location = useLocation();
  const {
    state: { trackingData },
  } = location;
  const [startTime, setStartTime] = useState(null);
  const [tracking, setTracking] = useState(trackingData.data);
  const navigate = useNavigate();

  console.log("trackingData =", trackingData);
  console.log("tracking =", tracking);

  ////////// GET START TIME //////////

  useEffect(() => {
    const getStartTime = async () => {
      const docRef = doc(db, "trackings", trackingData.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const date = new Date(docSnap.data().startTime.toDate().toString());
        const formattedDate = date.toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });
        setStartTime(formattedDate);
      } else {
        console.log("!!!get startTime error");
      }
    };
    getStartTime();
  }, [trackingData.id, trackingData.startTime]);

  ////////// ONCHANGE TRACKING //////////

  const onChangeTracking = (event, exerciseIndex, setIndex) => {
    const updateTracking = tracking.map((exercise, i) => {
      if (i === exerciseIndex) {
        return {
          ...exercise,
          sets: exercise.sets.map((set, j) => {
            if (j === setIndex) {
              return { ...set, [event.target.id]: event.target.value };
            } else {
              return set;
            }
          }),
        };
      } else {
        return exercise;
      }
    });
    setTracking(updateTracking);
    // console.log("updateTracking =", updateTracking);
    // console.log("tracking =", tracking);
  };

  ////////// ONCLICK DONE SET //////////

  const onClickDoneSet = async (event, exerciseIndex, setIndex) => {
    event.preventDefault();

    const updateSet = tracking.map((exercise, i) => {
      if (i === exerciseIndex) {
        return {
          ...exercise,
          sets: exercise.sets.map((set, j) => {
            if (j === setIndex) {
              return { ...set, status: true };
            } else {
              return set;
            }
          }),
        };
      } else {
        return exercise;
      }
    });
    setTracking(updateSet);
    console.log("updateSet =", updateSet);

    try {
      const docRef = doc(db, "trackings", trackingData.id);
      await updateDoc(docRef, { data: updateSet });
    } catch (error) {
      console.log("!!!updateDoc error =", error);
      toast.error("Something went wrong");
    }
  };

  ////////// ONCLICK EDIT SET //////////

  const onClickEditSet = (exerciseIndex, setIndex) => {
    const updateStatus = tracking.map((exercise, i) => {
      if (i === exerciseIndex) {
        return {
          ...exercise,
          sets: exercise.sets.map((set, j) => {
            if (j === setIndex) {
              return { ...set, status: false };
            } else {
              return set;
            }
          }),
        };
      } else {
        return exercise;
      }
    });
    setTracking(updateStatus);
    // console.log("updateStatus =", updateStatus);
  };

  ////////// ONFINISH WORKOUT //////////

  const onFinishWorkout = async (event) => {
    event.preventDefault();

    let allCompleted = true;
    tracking.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        if (!set.status) {
          allCompleted = false;
        }
      });
    });

    if (allCompleted) {
      navigate("/dashboard");
    } else {
      toast.error("Please complete all exercises");
    }

    const docRef = doc(db, "trackings", trackingData.id);
    await updateDoc(docRef, {
      finishTime: serverTimestamp(),
      name: trackingData.name,
    });
  };

  ////////// CONFIRM RELOAD PAGE //////////

  useEffect(() => {
    window.onbeforeunload = function () {
      return "";
    };
  }, []);

  // console.log("startTime =", startTime);

  return (
    <div className="max-w-xs mx-auto">
      <p className="text-2xl font-bold text-center mt-6">Track Your Workout</p>
      <p className="text-center">
        <span className="font-medium underline">Start time</span> : {startTime}
      </p>

      {tracking.map((exercise, exerciseIndex) => {
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
            <div className="mt-2 grid grid-cols-8">
              <p className="text-xs font-semibold uppercase">Set</p>
              <p className="text-xs font-semibold uppercase col-span-2">
                Weight
                <span className="font-normal lowercase">(kg)</span>
              </p>
              <p className="text-xs font-semibold uppercase col-span-2">Reps</p>
              <p className="text-xs font-semibold uppercase col-span-2">
                Status
              </p>
            </div>

            {/* SET TRACKING INPUT */}
            {tracking[exerciseIndex].sets.map((set, setIndex) => {
              return (
                <form
                  className="grid grid-cols-8 items-center"
                  key={setIndex}
                  onSubmit={(event) => {
                    onClickDoneSet(event, exerciseIndex, setIndex);
                  }}
                >
                  <p className="mt-2 text-lg font-semibold">{setIndex + 1}</p>
                  <input
                    className={`mt-1 rounded-md px-3 py-1 w-[70px] border ${
                      tracking[exerciseIndex].sets[setIndex].status
                        ? "border-[#f0f0f0]"
                        : "border-gray-300"
                    } col-span-2`}
                    type="number"
                    min={0}
                    id="weight"
                    value={set.weight}
                    required
                    disabled={tracking[exerciseIndex].sets[setIndex].status}
                    onChange={(event) => {
                      onChangeTracking(event, exerciseIndex, setIndex);
                    }}
                  />
                  <input
                    className={`mt-1 rounded-md px-3 py-1 w-[70px] border ${
                      tracking[exerciseIndex].sets[setIndex].status
                        ? "border-[#f0f0f0]"
                        : "border-gray-300"
                    } col-span-2`}
                    type="number"
                    min={0}
                    id="reps"
                    value={set.reps}
                    required
                    disabled={tracking[exerciseIndex].sets[setIndex].status}
                    onChange={(event) => {
                      onChangeTracking(event, exerciseIndex, setIndex);
                    }}
                  />
                  <button
                    className={`mt-1 w-[70px] rounded-md px-3 py-1 col-span-2 ${
                      tracking[exerciseIndex].sets[setIndex].status
                        ? "text-green-700 font-bold"
                        : "font-medium bg-white text-gray-400 border border-gray-300"
                    }`}
                    type="submit"
                    disabled={tracking[exerciseIndex].sets[setIndex].status}
                  >
                    Done
                  </button>
                  <FiEdit
                    className="mt-1 hover:text-red-600 cursor-pointer"
                    onClick={() => {
                      onClickEditSet(exerciseIndex, setIndex);
                    }}
                  />
                </form>
              );
            })}
          </div>
        );
      })}
      {trackingData.finishTime ? (
        <></>
      ) : (
        <button
          className="flex items-center justify-center w-full mt-4 text-white font-semibold bg-[#31455e] px-4 py-2 rounded-md shadow-sm hover:bg-[#29384c] hover:shadow-md focus:bg-[#1f2a39] focus:shadow-lg"
          onClick={onFinishWorkout}
        >
          Finish Workout
        </button>
      )}
    </div>
  );
};

export default TrackWorkout;
