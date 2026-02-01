import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route index path="/" Component={Home} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  );
};

export default App;
