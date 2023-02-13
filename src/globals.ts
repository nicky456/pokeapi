export enum SliceStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export const importImages = (image: string, filetype?: string) => {
  return `${process.env.PUBLIC_URL}/assets/images/${image}.${
    filetype || "png"
  }`;
};

export const importPokemonImage = (image: string) => {
  return `${process.env.PUBLIC_URL}/assets/pokemons/${image}.png`;
};

export const PokemonTypePlaceholders = {
  normal: importPokemonImage("togepi"),
  fire: importPokemonImage("charizard"),
  fighting: importPokemonImage("lucario"),
  water: importPokemonImage("blastoise"),
  flying: importPokemonImage("aerodactyl"),
  grass: importPokemonImage("venusaur"),
  poison: importPokemonImage("seviper"),
  electric: importPokemonImage("pikachu"),
  ground: importPokemonImage("diglett"),
  psychic: importPokemonImage("mew"),
  rock: importPokemonImage("onix"),
  ice: importPokemonImage("regice"),
  bug: importPokemonImage("butterfree"),
  dragon: importPokemonImage("dragonite"),
  ghost: importPokemonImage("ganger"),
  dark: importPokemonImage("weavile"),
  steel: importPokemonImage("klinklang"),
  fairy: importPokemonImage("clefable"),
};
