import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setFavs,
  filterBySpecies,
  sortByName,
  reset,
} from "../redux/actions/actions";

import Cards from "../Components/Cards/Cards";
import homeVideo from "../video/home.mp4";

import style from "./Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();

  const [dataLoaded, setDataLoaded] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const favorites = useSelector((state) => state.myfavorites);

  // useEffect para cargar los favoritos por primera vez.
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (dataLoaded) {
      dispatch(setFavs(storedUser.id, storedUser.token));
      setDataLoaded(false);
    }
  }, [dispatch, dataLoaded]);

  const handleFilter = (event) => {
    dispatch(filterBySpecies(event.target.value));
    setSelectedSpecies(event.target.value);
  };
  const handleSort = (event) => {
    dispatch(sortByName(event.target.value));
    setSelectedName(event.target.value);
  };

  function resetHandler() {
    dispatch(reset());
    setSelectedSpecies("");
    setSelectedName("");
  }

  return (
    <div className={style.favorites}>
      <h1 className={style.title}>THESE ARE YOUR FAVORITE CHARACTERS:</h1>
      <div className={style.filters}>
        <span>Filter by Species: </span>
        <select onChange={handleFilter} title="Filter characters by their species." value={selectedSpecies}>
          <option hidden defaultValue>
            Species
          </option>
          {[
            "Alien",
            "Animal",
            "Cronenberg",
            "Disease",
            "Human",
            "Humanoid",
            "Mythological Creature",
            "Poopybutthole",
            "Robot",
            "unknown",
          ].map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>
        <span>Sort by Name: </span>
        <select onChange={handleSort} title="Sort characters alphabetically." value={selectedName}>
          <option hidden defaultValue>
            Name
          </option>
          {["Name A-Z", "Name Z-A"].map((order) => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </select>
        <button className={style.clear} onClick={resetHandler} title="Reset the filters to see all your favorites again.">
          Clear filters
        </button>
      </div>
      <Cards characters={favorites} />
      <div className={style.videoWrapper}>
        <video src={homeVideo} autoPlay muted loop className={style.bgVideo} />
      </div>
    </div>
  );
};

export default Favorites;
