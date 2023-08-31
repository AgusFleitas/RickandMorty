import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";

let initialState = { myfavorites: [], allCharacters: [] };

function rootReducer(state = initialState, { type, payload }) {
  let sorted;
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myfavorites: [...state.myfavorites, payload],
        allCharacters: [...state.myfavorites, payload],
      };

    case REMOVE_FAV:
      return {
        ...state,
        myfavorites: state.myfavorites.filter(
          (character) => character.id !== payload
        ),
        allCharacters: state.myfavorites.filter(
          (character) => character.id !== payload
        ),
      };

    case FILTER:
      return {
        ...state,
        myfavorites: state.allCharacters.filter(
          (character) => character.gender === payload
        ),
      };

    case ORDER:
      if (payload === "Ascendente") {
        sorted = state.myfavorites.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else {
        sorted = state.myfavorites.sort((a, b) => (b.id > a.id ? 1 : -1));
      }
      return {
        ...state,
        myfavorites: [...sorted],
      };

    default:
      return state;
  }
}

export default rootReducer;
