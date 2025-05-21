import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeAccess from "./pages/EmployeeAccess";
import CreateSoftware from "./pages/CreateSoftware";
import ManagerPendingRequests from "./pages/ManagerPendingRequest";
import ProtectedRoute from "./components/ProtectedRoute";
import { getRoleFromToken, isAuthenticated } from "./utils/auth";
import Dashboard from "./pages/Dashboard";


function App() {
  const role = getRoleFromToken();
  const loggedIn = isAuthenticated();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={loggedIn ? `/${role?.toLowerCase()}` : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            {role === "Employee" ? <EmployeeAccess /> : <Navigate to="/login" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            {role === "Manager" ? <ManagerPendingRequests /> : <Navigate to="/login" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            {role === "Admin" ? <CreateSoftware /> : <Navigate to="/login" />}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}


export default App;
