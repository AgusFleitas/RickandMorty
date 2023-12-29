import Cards from "../Components/Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import { setFavs } from "../redux/actions/actions";
import { useEffect, useState } from "react";

import homeVideo from "../video/home.mp4";

import style from "./Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();

  const [dataLoaded, setDataLoaded] = useState(true);

  const favorites = useSelector((state) => state.myfavorites);

  // useEffect para cargar los favoritos por primera vez.
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (dataLoaded) {
      dispatch(setFavs(storedUser.id, storedUser.token));
      setDataLoaded(false);
    }
  }, [dispatch, dataLoaded]);


  return (
    <div className={style.favorites}>
      <h1 className={style.title}>THESE ARE YOUR FAVORITE CHARACTERS:</h1>
      <div className={style.filters}>
        <span>Filter by Gender: </span>
        <select>
          {["Male", "Female", "unknown", "Genderless"].map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <span>Sort by Name: </span>
        <select>
          {["Name A-Z", "Name Z-A"].map((order) => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </select>
        <button className={style.clear}>Clear filters</button>
      </div>
      <Cards characters={favorites} />
      <div className={style.videoWrapper}>
        <video src={homeVideo} autoPlay muted loop className={style.bgVideo} />
      </div>
    </div>
  );
};

export default Favorites;
