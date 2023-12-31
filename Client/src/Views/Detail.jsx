import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import homeVideo from "../video/home.mp4";

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
      <div class={style.wrapper}>
        <h2>{character.name}</h2>
        <img src={character.image} alt='' />
        <div class={style.otherdata}>
          <span>ID: </span>
          <div class={style.valuebox}>
            <span>#{character.id}</span>
          </div>
        </div>
        <div class={style.otherdata}>
          <span>STATUS: </span>
          <div class={style.valuebox}>
            <span>{character.status}</span>
          </div>
        </div>
        <div class={style.otherdata}>
          <span>SPECIES: </span>
          <div class={style.valuebox}>
            <span>{character.species}</span>
          </div>
        </div>
        <div class={style.otherdata}>
          <span>GENDER: </span>
          <div class={style.valuebox}>
            <span>{character.gender}</span>
          </div>
        </div>
        <div class={style.otherdata}>
          <span>ORIGIN: </span>
          <div class={style.valuebox}>
            <span>{character.origin}</span>
          </div>
        </div>
        <div class={style.otherdata}>
          <span>LOCATION: </span>
          <div class={style.valuebox}>
            <span>{character.location}</span>
          </div>
        </div>
      </div>
      <div className={style.videoWrapper}>
        <video src={homeVideo} autoPlay muted loop className={style.bgVideo} />
      </div>
    </div>
  );
};

export default Detail;
