import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
const Dashboard = () => {
  const [trackingLists, setTrackingLists] = useState([]);
  const [trackingDateLists, setTrackingDateLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onClickExistingExercise = () => {
    navigate("/existing-exercise");
  };

  ////////// ONCLICK CREATE EXERCISE //////////

  const onClickCreateExercise = () => {
    navigate("/create-exercise");
  };

  ////////// ONCLICK TRACK WORKOUT //////////

  const onClickTrackWorkout = () => {
    navigate("/plan-workout");
  };

  ////////// FETCH TRACKING DATA //////////

  useEffect(() => {
    const fetchTrackingLists = async () => {
      const q = query(
        collection(db, "trackings"),
        where("userRef", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const getTrackingLists = [];
      querySnapshot.forEach((doc) => {
        getTrackingLists.push({ id: doc.id, data: doc.data() });
      });
      setTrackingLists(getTrackingLists);
      formatDate(getTrackingLists);
      setLoading(false);
    };
    fetchTrackingLists();
  }, []);

  console.log("trackingLists =", trackingLists);
  // console.log("trackingDateLists =", trackingDateLists);

  ////////// FORMAT DATE FUNCTION //////////

  const formatDate = (trackingLists) => {
    const trackingDateLists = [];
    trackingLists.forEach((trackingList) => {
      const date = new Date(trackingList.data.startTime.toDate().toString());
      const formattedDate = date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      trackingDateLists.push(formattedDate);
    });
    setTrackingDateLists(trackingDateLists);
  };

  ////////// ONCLICK TRACKING LIST //////////

  const onClickTrackingList = (event, trackingList) => {
    navigate(`/tracking-list/${trackingList.id}`);
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="max-w-[350px] mx-auto">
      <p className="text-center mt-6 text-2xl font-bold">Dashboard</p>

      {/* BUTTONS */}
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

      {/* TRACKING DATA */}
      <p className="mt-6 text-lg text-center font-bold">Your Tracking Data</p>
      <ul className="mt-3 space-y-2">
        {trackingLists.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No tracking data</p>
        ) : (
          trackingLists.map((trackingList, index) => {
            return (
              <li
                className="h-[50px] px-5 py-3 bg-white rounded-sm cursor-pointer shadow hover:shadow-md transition duration-150"
                key={trackingList.id}
                onClick={(event) => {
                  onClickTrackingList(event, trackingList);
                }}
              >
                <div className="flex justify-between">
                  <p>{trackingDateLists[index]}</p>
                  {trackingList.data.name ? (
                    <p className="text-[#648498] font-medium capitalize">
                      {trackingList.data.name}
                    </p>
                  ) : (
                    <p className="text-[#648498] font-medium">
                      {trackingList.data.data.length}{" "}
                      {trackingList.data.data.length > 1
                        ? "Exercises"
                        : "Exercise"}
                    </p>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
