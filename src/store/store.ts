import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { catchedReducer } from "./catchSlice";
import { pokemonReducer } from "./pokemonSlice";
import { pokemonsListReducer } from "./pokemonsListSlice";
import { pokemonTypesReducer } from "./pokemonTypesSlice";

export const rootReducer = combineReducers({
  pokemonTypes: pokemonTypesReducer,
  pokemonsList: pokemonsListReducer,
  pokemon: pokemonReducer,
  catched: catchedReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export default store;