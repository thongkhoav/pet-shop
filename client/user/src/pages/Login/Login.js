
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/authContext";
import './login.scss'

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    passsword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate("/");
  const { login } = useContext(AuthContext);

  // Functions
  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login">
      <h1>Log in</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          required
          onChange={handleInputChange}
          name="username"
          placeholder="Username"
        />
        <input
          required
          onChange={handleInputChange}
          name="password"
          placeholder="Password"
          type="password"
        />
        <button>Login</button>
        <p>{error && error}</p>
        <span>
          Don't have an account? <br /> <Link to="/register">Sign up</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;

