import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import ErrorNot from "../../components/ErrorNot";
import { useStateValue } from "../../contextAPI/StateProvider";
import img from "../../assets/logo.png";

function SignIn() {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState();

  const login = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, username };
      await axios.post("http://localhost:9000/users/register", newUser);
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

  return (
    <div className="login">
      <img className="login__logo" src={img} alt="logoregister" />

      <div className="login__container">
        <h1>Sign in</h1>
        {error && <ErrorNot msg={error} clear={() => setError(undefined)} />}
        <form>
          <h5>Username</h5>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
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
          <h5>Confirm Password</h5>
          <input
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            type="password"
          />
          <button
            onClick={register}
            type="submit"
            className="login__signInButton"
          >
            Sign in
          </button>
        </form>
        <p>
          By signing-in you agree to my website Conditions of Use and Sale.
          Please see our privacy notice, out cookies notice and our
          interest-based ads notice.
        </p>
        <p>If you're register already please Login</p>
        <button onClick={login} className="login__registerButton">
          Log In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
