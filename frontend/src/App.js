// app.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext.js";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to='/profile' replace />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;

// app.js
const ProtectedRoutes = () => {
  const { auth } = React.useContext(AuthContext);
  return (
        auth ? <Outlet /> : <Navigate to='/login' replace />
  );
};
