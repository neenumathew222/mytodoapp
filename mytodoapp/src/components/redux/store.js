import {createStore} from "redux";
import { rootReducer } from "./reducers/root.reducer";


export const initializeStore = (reduxState) => {
    return createStore(rootReducer,reduxState);
};