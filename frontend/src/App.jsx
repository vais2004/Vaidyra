import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import Service from "./pages/Service";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/services" element={<Service />} />
      </Routes>
    </div>
  );
}
