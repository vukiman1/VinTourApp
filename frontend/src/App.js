import "./App.css";
import AdminLayout from "./components/Layout/AdminLayout";
import Layout from "./components/Layout/Layout";
import React from "react";
import { useLocation } from "react-router-dom";
function App() {
  const { pathname } = useLocation();
  return pathname === "/admin" ? <AdminLayout /> : <Layout />;
}

export default App;
