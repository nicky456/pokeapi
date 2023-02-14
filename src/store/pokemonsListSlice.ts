import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";

export type PokemonBase={
  pokemon: {
    name: string | undefined;
    url: string;
  }
  slot: number
}

type SliceState = {
    data: (PokemonBase | null)[];
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

const pokemonsListSlice = createSlice({
  name: "pokemonsList",
  initialState,
  reducers:{
    ...statusHandlerReducer,
    getPokemonsListReducer(
      state,
      action: PayloadAction<{
        pokemonsList: (PokemonBase | null)[];
      }>
    ){
      const { pokemonsList } = action.payload;
      state.data = pokemonsList;
    },
    resetPokemonsListReducer(state, action){
      state.data =[];
    }
  }
})

export const pokemonsListReducer = pokemonsListSlice.reducer;
export const {
  initialize,
  error,
  success,
  getPokemonsListReducer,
  resetPokemonsListReducer,
} = pokemonsListSlice.actions;

const statusHandler = { initialize, error, success };

export const pokemonsListSelector = (state: RootState) =>
  state.pokemonsList;

export const getpokemonsList = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, {type}) => {
    const result = await fromApi.getPokemonsByTypes(type);
    const transformedPokemons = result?.pokemon?.map((res: NamedAPIResource) => ({
      ...res,
   
    }));
    dispatch(
      getPokemonsListReducer({
        pokemonsList: transformedPokemons,
      })
    );
  })