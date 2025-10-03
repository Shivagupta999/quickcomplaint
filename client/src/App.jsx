import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RegisterScreen from "./RegisterScreen";
import MainScreen from "./Mainscreen";
import SuccessScreen from "./SuccessScreen";
import Profile from "./MyProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
