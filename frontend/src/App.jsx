import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeAccess from "./pages/EmployeeAccess";
import CreateSoftware from "./pages/CreateSoftware";
import ManagerPendingRequests from "./pages/ManagerPendingRequest";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./api/AuthContext"; // ✅ Use context

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Wait for auth check

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? `/${user.role.toLowerCase()}` : "/login"} />}
      />
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
            {user?.role === "Employee" ? <EmployeeAccess /> : <Navigate to="/login" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            {user?.role === "Manager" ? <ManagerPendingRequests /> : <Navigate to="/login" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            {user?.role === "Admin" ? <CreateSoftware /> : <Navigate to="/login" />}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
