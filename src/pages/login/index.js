import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { useStateValue } from "../../contextAPI/StateProvider";
import ErrorNot from "../../components/ErrorNot";
import img from "../../assets/logo.png";

function Login() {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
  const [error, setError] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post("http://localhost:9000/users/login", {
        email,
        password,
      });
      dispatch({
        type: "SET_USER",
        user: loginRes.data.user,
        token: loginRes.data.token,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const register = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  return (
    <div className="login">
      <img className="login__logo" src={img} alt="logologin" />

      <div className="login__container">
        <h1>Log in</h1>
        {error && <ErrorNot msg={error} clear={() => setError(undefined)} />}
        <form>
          <h5>Email</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button onClick={login} type="submit" className="login__signInButton">
            Log In
          </button>
        </form>
        <p>
          By signing-in you agree to my website Conditions of Use and Sale.
          Please see our privacy notice, out cookies notice and our
          interest-based ads notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your account
        </button>
      </div>
    </div>
  );
}

export default Login;
