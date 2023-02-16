import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "./globals";
import { RootState } from "./store";
import {
  statusHandlerReducer,
  wrapReduxAsyncHandler,
} from "./utilities";
import { Pokemon } from "./types";

//// Get and store selected Pokemon

type SliceState = {
  data: (Pokemon);
  status: {
    state: SliceStatus;
  };
};

const initialState: SliceState = {
  data: [][0],
  status: {
    state: SliceStatus.IDLE,
  },
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getSinglePokemonReducer(
      state,
      action: PayloadAction<{ pokemon: (Pokemon) }>
    ) {
      const { pokemon } = action.payload;
      state.data = pokemon
    },
  },
});

export const pokemonReducer = pokemonSlice.reducer;
export const {
  initialize,
  error,
  success,
  getSinglePokemonReducer,
} = pokemonSlice.actions;

export const pokemonSelector = (state: RootState) => state.pokemon;

const statusHandler = { initialize, error, success };

export const getPokemonById = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { pokemonId }) => {
    const pokemon = await fromApi.getPokemonByNameOrId(pokemonId);
    const transformedPokemon = {
      ...pokemon,
    };
    dispatch(getSinglePokemonReducer({ pokemon: transformedPokemon }));
  }
);