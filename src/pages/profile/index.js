import React from "react";
import Repositories from "../../components/Repositories";
import "./style.scss";
import { useStateValue } from "../../contextAPI/StateProvider";
import Header from "../../components/Header";

function Profile() {
  const [{ user, repoId }] = useStateValue();
  return (
    <div>
      <Header fav />
      {repoId?.length === 0 ? (
        <div className="favlist">
          <h2> Your list of favorite repositories is empty</h2>
          <p>
            You have no items in your list. To put some repo here, you have to
            add them in the main section of the application
          </p>
        </div>
      ) : (
        <div className="favlist">
          <h2>
            Hello {user?.username}, this is your favorite list of repositories
          </h2>
          {repoId.map((item) => (
            <Repositories
              removeBtn
              id={item.id}
              description={item.description}
              name={item.name}
              language={item.language}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
