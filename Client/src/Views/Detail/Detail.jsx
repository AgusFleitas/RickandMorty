import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/character/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacter(data);
      } else {
        window.alert("Hubo un error al cargar el Detail.");
      }
    });
    return setCharacter({});
  }, [id]);

  return (
    <div className={style.detail}>
      <h1 className={style.title}>DETAILS ABOUT THE CHARACTER</h1>
      <div className={style.wrapper}>
        <h2>{character.name}</h2>
        <img src={character.image} alt='' />
        <div className={style.otherdata}>
          <span>ID: </span>
          <div className={style.valuebox}>
            <span>#{character.id}</span>
          </div>
        </div>
        <div className={style.otherdata}>
          <span>STATUS: </span>
          <div className={style.valuebox}>
            <span>{character.status}</span>
          </div>
        </div>
        <div className={style.otherdata}>
          <span>SPECIES: </span>
          <div className={style.valuebox}>
            <span>{character.species}</span>
          </div>
        </div>
        <div className={style.otherdata}>
          <span>GENDER: </span>
          <div className={style.valuebox}>
            <span>{character.gender}</span>
          </div>
        </div>
        <div className={style.otherdata}>
          <span>ORIGIN: </span>
          <div className={style.valuebox}>
            <span>{character.origin}</span>
          </div>
        </div>
        <div className={style.otherdata}>
          <span>LOCATION: </span>
          <div className={style.valuebox}>
            <span>{character.location}</span>
          </div>
        </div>
      </div>
      <div className={style.videoWrapper}>
        <video src={"https://res.cloudinary.com/dlahgnpwp/video/upload/v1705001475/cdaxsx5h2f54as6t41s6.mp4"} autoPlay muted loop className={style.bgVideo} />
      </div>
    </div>
  );
};

export default Detail;
