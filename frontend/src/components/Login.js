// components/login.js
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import './Login.css'

function Login() {
  const [state, setState] = React.useState({});
  const { setUser, setAuth } = React.useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/auth/login", state).then((response) => {
      setUser(response.data.foundUser);
      setAuth(true);
      Cookies.set("authToken", response.data.token);
      navigate("/products");
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className='login-form-container'>
      <h1 className='login-form-title'>Login</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <p>Email</p>
        <input  
          className='login-form-input' 
          name="email" 
          value={state.email} 
          onChange={handleChange} 
        />
        <br />
        <p>Password</p>
        <input
          className='login-form-input' 
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        <br />
        <button className='login-form-submit-button' type="submit">Login</button>
        <Link className="signup-link" to="/signup">Click here to signup</Link>
      </form>
    </div>
  );
}
export default Login;
