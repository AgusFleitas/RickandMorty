import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { ThunkMiddleware } from "redux-thunk";
import rootReducer from "./reducer"

export default createStore(rootReducer, composeWithDevTools());
