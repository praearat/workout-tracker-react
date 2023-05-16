import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateExercise from "./pages/CreateExercise";
import ExistingExercise from "./pages/ExistingExercise";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import PlanWorkout from "./pages/PlanWorkout";
import TrackWorkout from "./pages/TrackWorkout";
import TrackingList from "./pages/TrackingList";
import CreatePlan from "./pages/CreatePlan";
import PlanList from "./pages/PlanList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/create-exercise" element={<PrivateRoute />}>
            <Route path="/create-exercise" element={<CreateExercise />} />
          </Route>
          <Route path="/existing-exercise" element={<PrivateRoute />}>
            <Route path="/existing-exercise" element={<ExistingExercise />} />
          </Route>
          <Route path="/plan-workout" element={<PrivateRoute />}>
            <Route path="/plan-workout" element={<PlanWorkout />} />
          </Route>
          <Route path="/track-workout" element={<PrivateRoute />}>
            <Route path="/track-workout" element={<TrackWorkout />} />
          </Route>
          <Route path="/tracking-list" element={<PrivateRoute />}>
            <Route
              path="/tracking-list/:trackingId"
              element={<TrackingList />}
            />
          </Route>
          <Route path="/create-plan" element={<PrivateRoute />}>
            <Route path="/create-plan" element={<CreatePlan />} />
          </Route>
          <Route path="/plan-list" element={<PrivateRoute />}>
            <Route path="/plan-list/:planId" element={<PlanList />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
