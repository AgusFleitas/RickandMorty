import { ADD_FAV, REMOVE_FAV } from "./action-types";

let initialState = { myfavorites: [] };

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myfavorites: [...state.myfavorites, payload],
      };

    case REMOVE_FAV:
      return {
        ...state,
        myfavorites: state.myfavorites.filter(
          (character) => character.id !== payload
        ),
      };

    default:
      return state;
  }
}

export default rootReducer;