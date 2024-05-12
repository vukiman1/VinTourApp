import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Admin from "../pages/Admin";
import { AuthContext } from "../context/AuthContext";
const AdminRouter = () => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/home");
    }
  }, [role, navigate]);

  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};
export default AdminRouter;
