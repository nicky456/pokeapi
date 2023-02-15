import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import {
  statusHandlerReducer,
  wrapReduxAsyncHandler,
} from "./utilities";

export const PAGINATE_SIZE = 6;

export type Pokemon = {
  id: number;
  name: string | undefined;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
  }[];
  forms: NamedAPIResource[];
  moves: {
    move: NamedAPIResource;
  }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_fhiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
  };
  species: NamedAPIResource[];
  stats: {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
  }[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
};

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
    // addPokemon(state, action: PayloadAction<{ pokemon: (Pokemon|null) }>){
    //   state.push(action.payload)
    // }
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
    //dispatch(addPokemon({ pokemon: transformedPokemon }));
  }
);