import React from "react";
import Navbar from "./Navbar"; // Assuming Navbar component is defined in Navbar.js or Navbar.jsx
import EmployeeForm from "./EmployeeForm";
import DatabaseComponent from "./DatabaseComponent";
import ManagerComponent from "./ManagerDashboard";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Employee Management System</h1>
      <Navbar />
      <Routes>
        <Route path="/employee" element={<EmployeeForm />} />
        <Route path="/dashboard" element={<DatabaseComponent />} />
        <Route path="/database" element={<ManagerComponent />} />
      </Routes>
    </div>
  );
};

export default App;
