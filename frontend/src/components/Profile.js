// components/profile.js
import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Profile() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <p>
        Welcome {user.name} {user.lastname}
      </p>
      <button
        onClick={() => {
          Cookies.remove("authToken");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
