import React, { useEffect } from "react";
import Exhibit from "../../components/Exhibit";
import HOC from "../../components/HOC";
import Navbar from "../../components/Navbar";

const exhibit = () => {
  return (
    <HOC>
      <Navbar />
      <Exhibit />
    </HOC>
  );
};

export default exhibit;
