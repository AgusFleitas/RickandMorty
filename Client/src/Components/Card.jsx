import { Link } from "react-router-dom";
import { addFav, removeFav } from "../redux/actions/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

function Card(props) {
  // { id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myfavorites}

  const { character, onClose, myfavorites, addFav, removeFav } = props;
  const [isFav, setIsFav] = useState(false);
  const [closeBtn, setCloseBtn] = useState(true);

  useEffect(() => {
   if (!onClose) {
     setCloseBtn(false);
   }
 }, []);
  
  const handleFavorite = (character) => {
    if (!isFav) {
      addFav(character);
      setIsFav(true);
    } else {
      removeFav(character);
      setIsFav(false);
    }
  };

  useEffect(() => {
    myfavorites.forEach((fav) => {
      if (fav.id === character.id) {
        setIsFav(true);
      }
    });
  }, [myfavorites]);

  return (
    <div>
      {closeBtn && (
        <button
          onClick={() => {
            onClose(character.id);
          }}
        >
          X
        </button>
      )}
      {isFav ? (
        <button
          onClick={() => {
            handleFavorite(character.id);
          }}
        >
          ❤️
        </button>
      ) : (
        <button
          onClick={() => {
            handleFavorite(character);
          }}
        >
          🤍
        </button>
      )}
      <Link to={`/detail/${character.id}`}>
        <h2>{character.name}</h2>
      </Link>
      <h2>{character.species}</h2>
      <h2>{character.gender}</h2>
      <h2>{character.status}</h2>
      <h2>{character.origin?.name}</h2>
      <img src={character.image} alt="" />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => dispatch(addFav(character)),
    removeFav: (id) => dispatch(removeFav(id)),
  };
};
const mapStateToProps = (state) => {
  return {
    myfavorites: state.myfavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
