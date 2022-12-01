import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar"
import Home from "./components/home";
import AllData from "./components/alldata";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import {UserContext} from "./components/context";


function InApp() {
  return (
    <div className="App">  
    <NavBar />
    <UserContext.Provider value={{users:[], deposits:[], withdraws:[], balance:[]}}>
      <Routes>       
        <Route path="/" element={<Home />} />
        <Route path="/alldata" element={<AllData />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
      </Routes>
    </UserContext.Provider>
    </div>
  );
}

export default InApp;