import React from "react";
import "./style.scss";
import PersonIcon from "@material-ui/icons/Person";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PeopleIcon from "@material-ui/icons/People";
import { useState } from "react";
import axios from "axios";
import Repositories from "../../components/Repositories";
import Header from "../../components/Header";

function Github() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [repositories, setRepositories] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    let userInfo = await axios.get(`https://api.github.com/users/${input}`);
    setData(userInfo.data);
    let repo = await axios.get(`https://api.github.com/users/${input}/repos`);
    setRepositories(repo.data);
  };

  return (
    <div className="github">
      <Header />
      <div className="github__con">
        <div className="github__container">
          <form className="github__containerForm">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="github__containerInput"
              type="text"
              placeholder="Github User"
            />
            <button
              onClick={search}
              type="submit"
              className="github__containerBtn"
            >
              Search
            </button>
          </form>
          <div className="github__containerCard">
            {data.avatar_url && (
              <>
                <img
                  className="github__containerLogo"
                  src={data.avatar_url}
                  alt="githubLogo"
                />
                <div className="github__containerCardItems">
                  <div className="github__containerCardItem">
                    <PersonIcon /> <p>{data.followers} followers</p>
                  </div>
                  <div className="github__containerCardItem">
                    <AssessmentIcon /> <p>{data.public_repos} repositories</p>{" "}
                  </div>
                  <div className="github__containerCardItem">
                    <PeopleIcon /> <p>{data.following} following</p>{" "}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {data.avatar_url && (
        <>
          {repositories.map((repository) => (
            <Repositories
              key={repository.id}
              id={repository.id}
              name={repository.name}
              description={repository.description}
              language={repository.language}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Github;
