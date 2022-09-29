// components/signup.js
import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Signup.css';

function Signup() {
  const [state, setState] = React.useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/signup", state)
      .then((response) => {
        alert("user has been signed up successfully");
        navigate("/login");
      })
      .catch((err) => alert(err));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className='signup-form-container'>
      <h1 className='signup-form-title'>Signup</h1>
      <form className='signup-form' onSubmit={handleSubmit}>
        <p>Name</p>
        <input className='signup-form-input' name="name" value={state.name} onChange={handleChange} />
        <br />
        <p>Last Name</p>
        <input className='signup-form-input' name="lastname" value={state.lastname} onChange={handleChange} />
        <br />
        <p>Email</p>
        <input className='signup-form-input' name="email" value={state.email} onChange={handleChange} />
        <br />
        <p>Password</p>
        <input
          className='signup-form-input'
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        <br />
        <button className='signup-form-submit-button' type="submit">Signup</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}
export default Signup;
