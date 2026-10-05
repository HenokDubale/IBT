"use client";
import React from "react";

const error = ({ error, reset }) => {
  return (
    <div>
      <span>somthing went wrong</span>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default error;
