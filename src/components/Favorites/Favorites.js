import React, { useState } from "react";

import "./Favorites.css";
import { connect } from "react-redux";
import { removeMovie, postList } from "../../state/actions/dataActions";
import { Link } from "react-router-dom";

function Favorites(props) {
  const [state, setState] = useState({
    btnCheck: false,
    title: "",
    disabled: false,
  });

  const favoriteChangeHandler = (e) => {
    setState({ title: e.target.value });
  };
  const getID = () => {
    let favoritesIDArray = props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };
  const saveListHandler = () => {
    if (!state.title.length) {
      setState((prev) => ({ ...prev, disabled: true }));
    } else {
      setState((prev) => ({ ...prev, btnCheck: true }));
      props.postList(state.title, getID());
    }
  };
  const { title, btnCheck } = state;
  return (
    <div className="favorites">
      <input
        value={title}
        placeholder="Your List"
        className="favorites__name"
        onChange={favoriteChangeHandler}
        disabled={state.btnCheck}
      />
      <ul className="favorites__list">
        {props.favoriteList.map((item) => {
          return (
            <li key={item.imdbID}>
              <div className="block">
                <button
                  className="remove-favorite-movie"
                  onClick={() => props.removeMovie(item.imdbID)}
                >
                  🗑️
                </button>
                <p className="movie-name">
                  {item.Title} ({item.Year})
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {!btnCheck ? (
        <button
          type="button"
          className="favorites__save"
          onClick={saveListHandler}
          disabled={state.disabled}
        >
          Save List
        </button>
      ) : (
        <button type="button" className="favorites__save">
          <Link
            to={"/list/" + props.listID}
            target="_blank"
            className="link-to__list"
          >
            Your favorite movies
          </Link>
        </button>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovie: (id) => {
      dispatch(removeMovie(id));
    },
    postList: (title, favoritesIDArray) => {
      dispatch(postList(title, favoritesIDArray));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
