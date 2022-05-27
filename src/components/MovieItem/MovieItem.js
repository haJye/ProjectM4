import React from "react";
import { connect } from "react-redux";
import "./MovieItem.css";
import { addFavoriteList } from "../../state/actions/dataActions";

function MovieItem(props) {
  const ifIdInFavorites = (imdbID) => {
    const active = props.favoriteList.find((item) => {
      return item.imdbID === imdbID;
    });
    if (active) {
      return true;
    }
  };

    const { Title, Year, Poster, imdbID } = props;
    return (
      <article className="movie-item">
        <img className="movie-item__poster" src={Poster} alt={Title} />
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {Title}&nbsp;({Year})
          </h3>
          <button
            style={{
            opacity: ifIdInFavorites(imdbID)? "0.5":"1"
            }}
            type="button"
            className="movie-item__add-button"
            onClick={() => {
              props.addFavoriteList(imdbID);
            }}
            disabled={ifIdInFavorites(imdbID)}
          >
            {ifIdInFavorites(imdbID) ? `Movie added to cart` : "Add to cart"}
          </button>
        </div>
      </article>
    );
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteList: (imdbID) => {
      dispatch(addFavoriteList(imdbID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
