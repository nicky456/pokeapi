import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { storedPokemonTypesReducer } from "./stroredPokemonTypesSlice";

export const rootReducer = combineReducers({
  storedPokemonTypes: storedPokemonTypesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export default store;