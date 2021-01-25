import React from "react";
import "./style.scss";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="home__container">
        <Link to="/home/github">
          <div className="home__github">
            <GitHubIcon /> <h1>Your Github repositories</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
