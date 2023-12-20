import { Link } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

import style from "./Card.module.css";

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
    <div className={style.cardContainer}>
      <span className={style.characterName}>{character.name}</span>
      <div className={style.imageContainer}>
        <img src={character.image} alt="" />
      </div>
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
          className={style.favButton}
          onClick={() => {
            handleFavorite(character.id);
          }}
        >
          💜
        </button>
      ) : (
        <button
          className={style.favButton}
          onClick={() => {
            handleFavorite(character);
          }}
        >
          🤍
        </button>
      )}
      <div className={style.contentContainer}>
        <p>Species: <span>{character.species}</span></p>
        <p>Status: <span>{character.status}</span></p>
      </div>
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
