import { useSelector } from "react-redux";

import Cards from "../Components/Cards/Cards";
import homeVideo from "../video/home.mp4";

import style from "./Home.module.css";

// Poner en funcionamiento el Register y el AddRandom.

const Home = () => {
  const characters = useSelector((state) => state.allCharacters);

  return (
    <>
      <Cards characters={characters} />
      <div className={style.videoWrapper}>
        <video src={homeVideo} autoPlay muted loop className={style.bgVideo} />
      </div>
      {characters.length === 0 && (
        <span className={style.empty}>
          Hey, your Home is empty!
          <br></br>
          Try to add some characters.
        </span>
      )}
    </>
  );
};

export default Home;
