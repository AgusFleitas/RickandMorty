import { Link, useLocation } from "react-router-dom";
import { deleteChar, addFav, removeFav } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import style from "./Card.module.css";

function Card(props) {
  const { character } = props;
  const [isFav, setIsFav] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

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

  // useEffect para saber is el personaje está en favoritos.
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/favcharacter', 
        {params: {
          userID: storedUser.id,
          charID: character.id
        }
      });
        
        if (response.data) {
          setIsFav(true)
        }
      } catch (error) {
        console.log(error);
        alert("Error al consultar si es favorito: " + error.response.data.Error)
      }
    };

    fetchData();
  }, [character.id])

  // Variable para el color del status.
  let colorClass;

  if (character.status === "Alive") {
    colorClass = style.green;
  } else if (character.status === "Dead") {
    colorClass = style.red;
  } else if (character.status === "unknown") {
    colorClass = style.yellow;
  }

  // Funcion para eliminar el personaje del Home.
  function deleteFromHome (id) {
    dispatch(deleteChar(id))
  }
  
  // Funcion que añade/elimina el personaje en favoritos.
  function favHandler(id) {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!isFav) {
      dispatch(addFav(storedUser.id, id));
      setIsFav(true);
    } else {
      dispatch(removeFav(storedUser.id, id));
      setIsFav(false);
    }
  }

  return (
    <div className={style.cardContainer}>
      <span className={style.characterName}>{character.name}</span>
      <Link to={`/detail/${character.id}`} className={style.redirects}>
      <div className={style.imageContainer}>
        <img src={character.image} alt='' />
      </div>
      </Link>
      <span className={style.charID}>#{character.id}</span>
      {location !== "/favorites" && (
        <button onClick={() => {deleteFromHome(character.id)}} className={style.delete}>
          ❌
        </button>
      )}
      {isFav ? (
        <button
          className={style.favButton}
          onClick={() => {
            favHandler(character.id);
          }}
        >
          💜
        </button>
      ) : (
        <button
          className={style.favButton}
          onClick={() => {
            favHandler(character.id);
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
