import "./App.css";
import Layout from "./components/Layout/Layout";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import SearchResultList from "./pages/SearchResultList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";

function App() {
  const componentWithLayout = (cpn) => {
    return <Layout cpn={cpn}></Layout>;
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={componentWithLayout(<Home />)} />
        <Route path="/tours" element={componentWithLayout(<Tours />)} />
        <Route
          path="/tours/:id"
          element={componentWithLayout(<TourDetails />)}
        />
        <Route path="/login" element={componentWithLayout(<Login />)} />
        <Route path="/register" element={componentWithLayout(<Register />)} />
        <Route path="/thank-you" element={componentWithLayout(<ThankYou />)} />
        <Route
          path="/tours/search"
          element={componentWithLayout(<SearchResultList />)}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
