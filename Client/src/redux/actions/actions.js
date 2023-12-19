import {
  SEARCH_BY_ID, 
  ADD_FAV, 
  REMOVE_FAV, 
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

export const addFav = (character) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);

      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFav = (id) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);

      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error);
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
