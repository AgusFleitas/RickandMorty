import {
  SEARCH_BY_ID,
  FILTER,
  SORT,
  RESET,
  DELETE_FROM_HOME,
  SET_CHARACTERS,
  SET_FAVORITES,
  ADD_FAV,
  REMOVE_FAV,
} from "../actions/action-types";

let initialState = { myfavorites: [], myfavoritesCopy: [], allCharacters: [] };

function rootReducer(state = initialState, { type, payload }) {
  let sorted;
  switch (type) {
    case SEARCH_BY_ID: {
      let currentCharacters = [...state.allCharacters];

      if (currentCharacters.length >= 1) {
        currentCharacters.push(payload);
      } else {
        currentCharacters = Array.isArray(payload) ? payload : [payload];
      }

      return {
        ...state,
        allCharacters: currentCharacters,
      };
    }

    case DELETE_FROM_HOME: {
      let currentCharacters = [...state.allCharacters];

      if (currentCharacters.length > 1) {
        currentCharacters = currentCharacters.filter(
          (character) => character.id !== payload
        );
      } else {
        currentCharacters = [];
      }

      return {
        ...state,
        allCharacters: currentCharacters,
      };
    }

    case SET_CHARACTERS: {
      let currentCharacters = [];

      if (Array.isArray(payload)) {
        currentCharacters = payload;
      }
    
      return {
        ...state,
        allCharacters: currentCharacters,
      };
    }

    case ADD_FAV: {
      let currentFavorites = [...state.myfavorites];

      if (currentFavorites.length >= 1) {
        currentFavorites.push(payload);
      } else {
        currentFavorites = Array.isArray(payload) ? payload : [payload];
      }

      return {
        ...state,
        myfavorites: currentFavorites,
        myfavoritesCopy: currentFavorites,
      };
    }

    case REMOVE_FAV: {
      let currentFavorites = [...state.myfavorites];

      if (currentFavorites.length > 1) {
        currentFavorites = currentFavorites.filter(
          (character) => character.id !== payload.id
        );
      } else {
        currentFavorites = [];
      }

      return {
        ...state,
        myfavorites: currentFavorites,
        myfavoritesCopy: currentFavorites,
      };
    }

    case SET_FAVORITES:
      return {
        ...state,
        myfavorites: payload,
        myfavoritesCopy: payload,
      } 

    case FILTER: 
      return {
        ...state,
        myfavorites: state.myfavoritesCopy.filter(
          (character) => character.species === payload
        ),
      };

    case SORT:
      if (payload === "Name A-Z") {
        sorted = state.myfavorites.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        sorted = state.myfavorites.sort((a, b) => (b.name > a.name ? 1 : -1));
      }
      return {
        ...state,
        myfavorites: [...sorted],
      };

    case RESET:
      return {
        ...state,
        myfavorites: state.myfavoritesCopy,
      };

    default:
      return state;
  }
}

export default rootReducer;
