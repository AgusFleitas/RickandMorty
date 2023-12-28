import Cards from "../Components/Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import { filterCards, orderCards } from "../redux/actions/actions";
import { useEffect, useState } from "react";
import axios from "axios";

import homeVideo from "../video/home.mp4";

import style from "./Favorites.module.css"

const Favorites = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/favcharacters",
          {
            params: {
              userID: storedUser.id,
            },
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          }
        );

        console.log(response.data);

        if (response.data) {
          setFavorites(response.data);
        }
      } catch (error) {
        console.log(error);
        alert(
          "Error al consultar tus favoritos favoritos: " +
            error.response.data.Error
        );
      }
    };

    fetchData();
  }, []);

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
  };

  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
  };

  // function resetHandler() {
  //   dispatch(reset());
  // }

  return (
    <div className={style.favorites}>
      <h1 className={style.title}>THESE ARE YOUR FAVORITE CHARACTERS:</h1>
      <div className={style.filters}>
        <span>Filter by Gender: </span>
        <select onChange={handleFilter}>
          {["Male", "Female", "unknown", "Genderless"].map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <span>Sort by Name: </span>
        <select onChange={handleOrder}>
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
