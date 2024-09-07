import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import InternList from "./Components/InternComponent/InternList/InternList";
import InternForm from "./Components/InternComponent/InternForm/InternFrom";
import InternDetails from "./Pages/InternPage";
import PerformancePage from "./Pages/PerformancePage";
import TaskManagement from "./Components/TaskComponent/TaskManagement";
import TaskPage from "./Pages/TaskPage";
import FeedbackForm from "./Components/FeedbackComponent/FeedbackFrom";
import FeedbackPage from "./Pages/feedbackPage";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Auth/Dashboard";
import Register from "./Components/Auth/Register";
import NavBar from "./Components/Navbar/Navbar";

function App() {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<InternList />} />
          <Route path="/add" element={<InternForm />} />
          <Route path="/interns/:id" element={<InternDetails />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/task/:internId" element={<TaskManagement />} />
          <Route path="/task/add/:internId" element={<TaskPage />} />
          <Route path="/feedback/add/:internId" element={<FeedbackForm />} />
          <Route path="/feedback/:internId" element={<FeedbackPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/navbar" element={<NavBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
