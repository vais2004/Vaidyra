import React from "react";
import { Navbar } from "../components/Navbar";
import { heroStyles } from "../assets/dummyStyles";

export const Hero = () => {
  return (
    <div className={heroStyles.container}>
      <Navbar />
    </div>
  );
};
