import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./authComponents/authLogin";
import { Register } from "./authComponents/authRegister";
import { ProtectedRoute } from "./authComponents/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import InApp from "./In-app";
import "./App.css";



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
              path="*"
              element={
                <ProtectedRoute>
                  <InApp />
                </ProtectedRoute>
              }
              />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;