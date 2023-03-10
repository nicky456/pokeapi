export type NamedAPIResource = {
  name: string;
  url: string;
};

export type APIResource = {
  url: string;
};

export type PokemonBase={
  pokemon: {
    name: string | undefined;
    url: string;
  }
  slot: number
}

export type Pokemon = {
  id: number;
  name: string ;
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