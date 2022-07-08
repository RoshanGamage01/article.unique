import React from "react";
import {  Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import Profile from "./pages/Profile";
import Article from "./pages/Article";
import Reading from "./pages/Reading";

function App(){
    return (
           <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/me" element={<Profile />}/>
                <Route path="/article" element={<Article />}/>
                <Route path="/article/:id" element={<Reading />}/>
           </Routes>
    )
}

export default App