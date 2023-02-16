import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  statusHandlerReducer,
} from "./utilities";

//// Catch and release Pokemons

type SliceState = {
  data: string[];
};

const initialState: SliceState = {
  data: [],
};

const catchedSlice = createSlice({
  name: "catched",
  initialState,
  reducers: {
    ...statusHandlerReducer,
   
    catchPokemonReducer(
      state,
      action: PayloadAction<string >
    ) {
      state.data.push(action.payload)
    },

    releasePokemonReducer(
      state,
      action: PayloadAction<string >
    ){
      function arrayRemove(arr: Array<string>, value: string) {
        return arr.filter(function (poke) {
          return poke !== value;
        });
      }
      state.data = arrayRemove(state.data, action.payload);
      
    }
    
  },
});

export const catchedReducer = catchedSlice.reducer;
export const {
  initialize,
  error,
  success,
  catchPokemonReducer,
  releasePokemonReducer
} = catchedSlice.actions;

export const catchedSelector = (state: RootState) => state.catched;

