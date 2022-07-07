import React from "react";
import {  Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import Profile from "./pages/Profile";

function App(){
    return (
           <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/me" element={<Profile/>}/>
           </Routes>
    )
}

export default App