import "./app.scss";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignIn from "./pages/register";
import { useStateValue } from "./contextAPI/StateProvider";
import Github from "./pages/github";
import Profile from "./pages/profile";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:9000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:9000/users", {
          headers: { "x-auth-token": token },
        });
        dispatch({
          type: "SET_USER",
          user: userRes.data,
          token,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home/github" component={Github} />
          <Route exact path="/home/profile" component={Profile} />
          <Route exact path="/register" component={SignIn} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
