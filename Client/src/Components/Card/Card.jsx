import { Link } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import style from "./Card.module.css";

function Card(props) {
  // { id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myfavorites}

  const { character, onClose, myfavorites, addFav, removeFav } = props;
  const [isFav, setIsFav] = useState(false);
  const [closeBtn, setCloseBtn] = useState(true);

  // Variable para el color de la especie.
  let speciesClass;

  switch (character.species) {
    case "Human":
      speciesClass = style.human;
      break;
    case "Animal":
      speciesClass = style.animal;
      break;
    case "Alien":
      speciesClass = style.alien;
      break;
    case "Robot":
      speciesClass = style.robot;
      break;
    case "Humanoid":
      speciesClass = style.humanoid;
      break;
    case "Mythological Creature":
      speciesClass = style.mythological;
      break;
    case "Poopybutthole":
      speciesClass = style.poopy;
      break;
    default:
      speciesClass = style.unknown
      break;
  }

  // Variable para el color del status.
  let colorClass;

  if (character.status === "Alive") {
    colorClass = style.green;
  } else if (character.status === "Dead") {
    colorClass = style.red;
  } else if (character.status === "unknown") {
    colorClass = style.yellow;
  }

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

  return (
    <div className={style.cardContainer}>
      <span className={style.characterName}>{character.name}</span>
      <Link to={`/detail/${character.id}`} className={style.redirects}>
      <div className={style.imageContainer}>
        <img src={character.image} alt='' />
      </div>
      </Link>
      <span className={style.charID}>#{character.id}</span>
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
        <p>
          Species: <span className={speciesClass}>{character.species}</span>
        </p>
        <p>
          Status: <span className={colorClass}>{character.status}</span>
        </p>
      </div>
    </div>
  );
}


export default Card;
