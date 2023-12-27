import {
  SEARCH_BY_ID, 
  ADD_FAV, 
  REMOVE_FAV, 
  FILTER, 
  ORDER, 
  RESET, 
  DELETE_FROM_HOME
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

export const addFav = (userID, charID) => {
  const endpoint = "http://localhost:3001/favcharacter";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, userID, charID);

      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error al agregar el personaje a favoritos: " + error);
    }
  };
};

export const removeFav = (userID, charID) => {
  const endpoint = "http://localhost:3001/favcharacter";
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint, userID, charID);

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
