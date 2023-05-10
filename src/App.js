import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-exercise" element={<CreateExercise />} />
          <Route path="/existing-exercise" element={<ExistingExercise />} />
          <Route path="/plan-workout" element={<PlanWorkout />} />
          <Route path="/track-workout" element={<TrackWorkout />} />
          <Route path="/tracking-list/:trackingId" element={<TrackingList />} />
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
