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
    cache: (NamedAPIResource & { distance: number })[];
    data: (NamedAPIResource & { distance: number })[];
    status: {
        state: SliceStatus;
    };
};  

const initialState: SliceState = {
    cache: [],
    data: [],
    status: {
      state: SliceStatus.IDLE,
    },
  };

const storedPokemonTypesSlice = createSlice({
  name: "storedPokemonTypes",
  initialState,
  reducers:{
    ...statusHandlerReducer,
    getStoredPokemonTypesReducer(
      state,
      action: PayloadAction<{
        storedPokemonTypes: (NamedAPIResource & { distance: number })[]
      }>
    ){
      const { storedPokemonTypes } = action.payload;
      state.cache = storedPokemonTypes;
      state.data = storedPokemonTypes;
    }
  }
})

export const storedPokemonTypesReducer = storedPokemonTypesSlice.reducer;
export const {
  initialize,
  error,
  success,
  getStoredPokemonTypesReducer,
} = storedPokemonTypesSlice.actions;

const statusHandler = { initialize, error, success };

export const storedPokemonTypesSelector = (state: RootState) =>
  state.storedPokemonTypes;

export const getstoredPokemonTypes = wrapReduxAsyncHandler(
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
      getStoredPokemonTypesReducer({
        storedPokemonTypes: transformedPokemonTypes,
      })
    );
  })