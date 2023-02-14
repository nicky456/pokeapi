import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";

// export type PokemonTypes = {
//     name: string;
//     url: string;
//   };

type SliceState = {
   
    data: (NamedAPIResource & { distance: number })[];
    status: {
        state: SliceStatus;
    };
};  

const initialState: SliceState = {
    
    data: [],
    status: {
      state: SliceStatus.IDLE,
    },
  };

const pokemonTypesSlice = createSlice({
  name: "pokemonTypes",
  initialState,
  reducers:{
    ...statusHandlerReducer,
    getPokemonTypesReducer(
      state,
      action: PayloadAction<{
        pokemonTypes: (NamedAPIResource & { distance: number })[]
      }>
    ){
      const { pokemonTypes } = action.payload;
      state.data = pokemonTypes;
    }
  }
})

export const pokemonTypesReducer = pokemonTypesSlice.reducer;
export const {
  initialize,
  error,
  success,
  getPokemonTypesReducer,
} = pokemonTypesSlice.actions;

const statusHandler = { initialize, error, success };

export const pokemonTypesSelector = (state: RootState) =>
  state.pokemonTypes;

export const getpokemonTypes = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch) => {
    const {
      results,
    }: { results: NamedAPIResource[] } = await fromApi.getTypes();
    const transformedPokemonTypes = results.map((res: NamedAPIResource) => ({
      ...res,
      distance: 0,
    }));
    dispatch(
      getPokemonTypesReducer({
        pokemonTypes: transformedPokemonTypes,
      })
    );
  })