import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";

let initialState = { myfavorites: [], allCharacters: [] };

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myfavorites: [...state.allCharacters, payload],
        allCharacters: [...state.allCharacters, payload],
      };

    case REMOVE_FAV:
      return {
        ...state,
        myfavorites: state.myfavorites.filter(
          (character) => character.id !== payload
        ),
      };

    case FILTER:
      return {
        ...state,
        myfavorites:
          payload === "allCharacters"
            ? [...state.allCharacters]
            : state.allCharacters.filter(
                (character) => character.gender === payload
              ),
      };

    case ORDER:
      const allCharactersCopy = [...state.allCharacters];
      return {
        ...state,
        myfavorites:
          payload === "A"
            ? allCharactersCopy.sort((a, b) => a.id - b.id)
            : allCharactersCopy.sort((a, b) => b.id - a.id),
      };

    default:
      return state;
  }
}

export default rootReducer;
