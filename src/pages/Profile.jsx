import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({ name: "", email: "" });
  const [savedPlans, setSavedPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  ////////// GET USER PROFILE //////////
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user =", user);
        const getUserProfile = { name: user.displayName, email: user.email };
        setUserProfile(getUserProfile);
      } else {
        console.log("User is signed out");
      }
    });

    setLoading(false);
  }, []);

  ////////// ONCLICK SIGN OUT //////////

  const onClickSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch (error) {
      console.log("!!!sign out error =", error);
    }
  };

  ////////// FETCH SAVED PLANS //////////

  useEffect(() => {
    const fetchSavedPlan = async () => {
      const q = query(
        collection(db, "plans"),
        where("userRef", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const getSavedPlans = [];
      querySnapshot.forEach((doc) => {
        getSavedPlans.push({ id: doc.id, data: doc.data() });
      });
      setSavedPlans(getSavedPlans);
      console.log("getSavedPlans =", getSavedPlans);
    };
    fetchSavedPlan();
  }, []);

  ////////// ONCLICK SAVED PLAN //////////

  const onClickSavedPlan = (planId) => {
    navigate(`/plan-list/${planId}`);
  };

  ////////// ON DELETE PLAN //////////

  const onDeletePlan = async (targetPlanId) => {
    await deleteDoc(doc(db, "plans", targetPlanId));
    const updatedSavedPlans = savedPlans.filter((plan) => {
      if (plan.id === targetPlanId) {
        return false;
      } else {
        return true;
      }
    });
    setSavedPlans(updatedSavedPlans);
  };

  ////////// LOADING //////////

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-[350px] mx-auto">
      <p className="text-center mt-6 text-2xl font-bold">Profile</p>
      <div className="mt-6 max-w-xs mx-auto space-y-1">
        <div className="grid grid-cols-4 items-center">
          <p className="font-medium">Name</p>
          <input
            className="px-3 py-1 rounded-md col-span-3"
            value={userProfile.name}
            disabled
          />
        </div>
        <div className="grid grid-cols-4 items-center">
          <p className="font-medium">Email</p>
          <input
            className="px-3 py-1 rounded-md col-span-3"
            value={userProfile.email}
            disabled
          />
        </div>
        <div className="flex justify-between">
          <p className="text-blue-500 hover:text-blue-600 cursor-pointer">
            Edit name
          </p>
          <p
            className="text-red-500 hover:text-red-600 cursor-pointer"
            onClick={onClickSignOut}
          >
            Sign out
          </p>
        </div>
      </div>
      <p className="mt-6 text-lg text-center font-bold">
        Your Saved Workout Plan
      </p>
      <ul className="mt-3 space-y-2">
        {savedPlans.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No saved plan</p>
        ) : (
          savedPlans.map((plan) => {
            return (
              <div className="relative" key={plan.id}>
                <li
                  className="flex justify-between items-center h-[50px] px-5 py-3 bg-white border border-[#d1d9df] rounded-md cursor-pointer shadow-sm hover:shadow transition duration-150"
                  onClick={() => {
                    onClickSavedPlan(plan.id);
                  }}
                >
                  <p className="capitalize">{plan.data.name}</p>
                </li>
                <AiOutlineDelete
                  className="absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer text-gray-400 hover:text-red-700"
                  onClick={() => {
                    onDeletePlan(plan.id);
                  }}
                />
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Profile;
