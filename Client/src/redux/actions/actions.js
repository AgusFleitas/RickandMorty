import {
  SEARCH_BY_ID, 
  DELETE_FROM_HOME,
  SET_CHARACTERS,
  ADD_FAV,
  REMOVE_FAV,
  SET_FAVORITES, 
  FILTER, 
  ORDER, 
  RESET
} from "./action-types";
import axios from "axios";

export const searchById = (id) => {
  const endpoint = `http://localhost:3001/character/${id}`

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint, id)

      return dispatch({
        type: SEARCH_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error al buscar el personaje: " + error);
    }
  }
}

export const deleteChar = (id) => {
  return {
    type: DELETE_FROM_HOME,
    payload: id,
  };
}

export const setCharacters = (characters) => {
  return {
    type: SET_CHARACTERS,
    payload: characters,
  };
}

export const setFavs = (userID, userToken) => {
  console.log("Se ejecuta el setFavs");
  const endpoint = `http://localhost:3001/favcharacters`

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint,
        {
          params: {
            userID
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      return dispatch({
        type: SET_FAVORITES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error al obtener los personajes favoritos: " + error);
    }
  }
};

export const addFav = (userID, charID) => {
  const endpoint = `http://localhost:3001/favcharacter`

  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, {userID, charID})

      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error al agregar el personaje a favoritos: " + error);
    }
  }
};

export const removeFav = (userID, charID) => {
  const endpoint = "http://localhost:3001/favcharacter";

  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, {params: {userID, charID}});

      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error al eliminar el personaje de favoritos: " + error);
    }
  };
};

export const filterCards = (gender) => {
  return {
    type: FILTER,
    payload: gender,
  };
};

export const orderCards = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};
