import React from "react";
import "./style.scss";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useStateValue } from "../../contextAPI/StateProvider";

function Repositories({ name, description, language, id, removeBtn }) {
  const [{}, dispatch] = useStateValue();
  const addToFav = () => {
    dispatch({
      type: "ADD_TO_FAV",
      item: {
        id: id,
        name: name,
        description: description,
        language: language,
      },
    });
  };
  const remove = () => {
    dispatch({
      type: "REMOVE_FROM_FAV",
      id: id,
    });
  };
  return (
    <>
      {removeBtn ? (
        <div className="github__repo">
          <div className="github__singleRepo">
            <h2>{name}</h2>
            <h4>{description}</h4>
            <p>{language}</p>
          </div>
          <button onClick={remove}> REMOVE</button>
        </div>
      ) : (
        <div className="github__repo">
          <div className="github__singleRepo">
            <h2>{name}</h2>
            <h4>{description}</h4>
            <p>{language}</p>
          </div>
          <button className="yellow" onClick={addToFav}>
            {" "}
            <StarBorderIcon /> Star
          </button>
        </div>
      )}
    </>
  );
}

export default Repositories;
