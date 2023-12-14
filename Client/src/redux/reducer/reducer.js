import {
  ADD_FAV,
  REMOVE_FAV,
  FILTER,
  ORDER,
  RESET,
} from "../actions/action-types";

let initialState = { myfavorites: [], allCharacters: [] };

function rootReducer(state = initialState, { type, payload }) {
  let sorted;
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myfavorites: payload,
        allCharacters: payload,
      };

    case REMOVE_FAV:
      return {
        ...state,
        myfavorites: payload,
        allCharacters: payload,
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

    case RESET:
      return {
        ...state,
        myfavorites: state.allCharacters,
      };

    default:
      return state;
  }
}

export default rootReducer;