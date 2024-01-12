import { useSelector } from "react-redux";

import Cards from "../../Components/Cards/Cards";

import style from "./Home.module.css";

const Home = () => {
  const characters = useSelector((state) => state.allCharacters);

  return (
    <>
      <Cards characters={characters} />
      <div className={style.videoWrapper}>
        <video src={"https://res.cloudinary.com/dlahgnpwp/video/upload/v1705001475/cdaxsx5h2f54as6t41s6.mp4"} autoPlay muted loop className={style.bgVideo} />
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
